# Headers, transporte y dominio

Estado medido el 2026-11-24 21:01 UTC contra el sitio vivo. Este doc existe para que
nadie vuelva a agregar un `_headers` que Pages ignora ni crea que el markup puede
emitir headers de respuesta.

## Host real

`curl -I https://iaparaelbien.org/chaish/` devuelve `Server: GitHub.com`: es **GitHub Pages**,
build *legacy*, source `main` `/`, `https_enforced: true`, custom domain `iaparaelbien.org`
(`gh api repos/ia-para-el-bien-uy/ia-para-el-bien-uy.github.io/pages`).

No hay CDN propio delante del apex: los headers que llegan son los de Pages (más el caché de
Fastly: `X-Cache`, `Age`). Los subdominios `www.` y `chaish.` sí están proxeados por Cloudflare,
pero eso no toca las respuestas del apex.

## Lo que sí se controla desde el repo (F-03)

La política vive en `<meta http-equiv="Content-Security-Policy">`, una por página
(`chaish/index.html`, `chaish/memoria-abierta/index.html`, `index.html`). Detalle de directivas y
reglas de edición: `docs/OPENGREP.md` § CSP. Además cada página lleva
`<meta name="referrer" content="strict-origin-when-cross-origin">`.

El CSP en `<meta>` cubre: bloqueo de scripts, estilos, fuentes, imágenes y conexiones no
declaradas; `base-uri`/`form-action` en `'none'`. **No** cubre `frame-ancestors` (se ignora en
`<meta>`) ni `report-uri`.

## Lo que GitHub Pages no puede emitir — residual de F-03 (owner-only)

Pages no permite headers de respuesta propios. Faltan y **no se arreglan desde el repo**:

| Header | Estado | Por qué no se puede |
| --- | --- | --- |
| `Strict-Transport-Security` | ausente | header de respuesta; Pages no lo emite |
| `X-Frame-Options` | ausente | header de respuesta; `frame-ancestors` en `<meta>` se ignora |
| `X-Content-Type-Options: nosniff` | ausente | header de respuesta |
| `Content-Security-Policy` (header) | ausente | la política va en `<meta>`, con las limitaciones de arriba |

**Acción exacta del owner:** poner el apex detrás de Cloudflare (o cualquier host/proxy que
permita headers) y setear ahí los cuatro headers; con Cloudflare alcanza una *Transform Rule*
que agregue `Strict-Transport-Security: max-age=31536000; includeSubDomains`,
`X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff` y el mismo `Content-Security-Policy`
del `<meta>` como header. No se puede hacer desde el repo y no se debe simular con un archivo
`_headers`: Pages lo ignora.

## Transporte (F-05)

- `https_enforced: true` desde 2026-11-10: `http://` devuelve **301** a la misma URL en `https://`.
- No hay subrecursos por `http://` ni referencias protocol-relative (`//host`) en `src`, `href`,
  CSS `url()` ni `fetch`/XHR. El CSP `default-src 'none'` con allowlist explícita lo garantiza por
  construcción: cualquier recurso no declarado se bloquea.
- El único `http://` que quedaba era un **enlace de navegación** a `www.diputados.gub.uy`, cuyo
  certificado TLS está roto (`SEC_E_WRONG_PRINCIPAL`); se reemplazó por el PDF del mismo proyecto
  en `https://documentos.diputados.gub.uy/` (mismo organismo, TLS válido, 200 verificado).
- Los `xmlns='http://www.w3.org/2000/svg'` de los SVG inline en `chaish/style.css` son
  **namespaces**, no requests: no se tocan (cambiarlos rompe el parseo).
- `upgrade-insecure-requests` sigue sin agregarse: ya no hay ningún recurso `http://` que subir y
  la directiva sólo agrega superficie de confusión.

## Dominio custom (F-06)

- `CNAME` en la raíz: `iaparaelbien.org`, coincide con el custom domain de Pages y con la URL
  canónica. `chaish/CNAME` no existe (inerte; el redirect de los subdominios lo hace Cloudflare).
- `protected_domain_state` es `null` y `pending_domain_unverified_at` es `null`: **el dominio no
  está verificado** a nivel de cuenta. Ésa es la precondición de subdomain takeover.

**Acción exacta del owner (sólo el owner puede):** en la cuenta/org dueña del repo,
*Settings → Pages → Custom domain* → verificar `iaparaelbien.org` (crea el TXT
`_github-pages-challenge-<owner>` en el DNS). Con el dominio verificado, GitHub bloquea que otro
repo lo reclame. No se cambia DNS ni se adivina un dominio desde el código.
