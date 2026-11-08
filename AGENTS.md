# IA para el Bien (ia-para-el-bien-uy.github.io)

Landing estática de AI Safety uruguaya. HTML/CSS/JS puro, sin build, GitHub Pages, bilingüe ES/EN.
El sitio es una sola página (`chaish/index.html`); la raíz `index.html` solo redirige a `chaish/`.

## Dónde vive el repo

- **Fuente de verdad:** `C:\Users\diego\orca\ia-para-el-bien-uy.github.io` — el checkout que gestiona Orca, con remote SSH (`git@github.com:ia-para-el-bien-uy/…`). Es el que se pushea y el que publica.
- Clones que **no** son fuente de verdad:
  - `~/environment/ia-para-el-bien-uy.github.io` (WSL, remote HTTPS) — quedó atrás y nunca pusheó.
  - `C:\Users\diego\ia-para-el-bien-site` — sin `.git`, es un cajón de variantes HTML sueltas.
- Editar cualquiera de esos dos produce commits que **nunca se publican**.

## URL canónica

- `https://iaparaelbien.org/chaish/` es la canónica; `iaparaelbien.org` (raíz) y `chaish.iaparaelbien.org` redirigen ahí.
- Pages sirve desde la rama `main`, path `/` (build "legacy"). Solo cuenta el `CNAME` de la raíz.
- **DNS y Cloudflare:** `iaparaelbien.org` apunta directo a GitHub Pages (`Server: GitHub.com`, IPs `185.199.108-111.153`). Los subdominios `www.iaparaelbien.org` y `chaish.iaparaelbien.org` están proxeados por **Cloudflare** y devuelven 301 al apex (`/` y `/chaish` respectivamente). O sea: ese redirect lo hace Cloudflare, **no** Pages — el `chaish/CNAME` del repo es inerte.

## Preview local

Servir el repo directamente — es lo único que refleja lo que estás editando:

```bash
python -m http.server 8099 --bind 127.0.0.1   # luego abrir http://127.0.0.1:8099/chaish/
```

El pipeline viejo de sync está **muerto**: `ia-para-el-bien-sync.sh` lee de `~/environment/ia-para-el-bien-site`, que ya no existe, y `C:\Users\diego\ia-para-el-bien-preview` quedó desincronizado del repo.

## Git

Conventional commits, uno por cambio lógico. Commit sin push → aprobación del usuario → push.

## Deploy y verificación (GitHub Pages)

Después de pushear, verificar **en este orden**. Releer la URL viva sola **no prueba nada**: un 200 fresco puede seguir siendo la generación anterior.

1. Remote: `git ls-remote origin refs/heads/main` debe devolver tu SHA local.
2. Build de Pages: `gh api repos/ia-para-el-bien-uy/ia-para-el-bien-uy.github.io/pages/builds/latest` y `gh run list --limit 3`.
3. Contenido vivo con cache-buster: `curl -s "https://iaparaelbien.org/chaish/?cb=$RANDOM"`.

- **El cache es lo que engaña:** Pages sirve `Cache-Control: max-age=600`, así que un re-fetch sin cache-buster puede devolver la generación anterior hasta **10 minutos**. El deploy en sí tarda 40–90 s. Nunca concluir "no se publicó" con una lectura sin `?cb=` — usar el paso 3.
- Si `pages.status` queda `errored` y el job `build` queda `queued` para siempre, el pipeline está trabado. **Un agente NO puede recuperarlo**: el PAT devuelve `403` en `actions:write` / `pages:write`. Decirlo, en vez de reintentar.
- Recuperación (**solo admin**): *Actions → re-run del workflow fallido*, o *Settings → Pages → Save*.
- Un estado `errored` se destraba solo con el próximo build exitoso: **un commit real alcanza** (así se destrabó el 2026-10-08, tras ~35 min de builds fallidos). Si los builds siguen fallando o quedan `queued`, el problema es del lado de GitHub: esperar y reintentar, o re-run desde la UI. Un commit vacío solo para re-disparar ensucia el historial sin cambiar el timing.
- `https_enforced: false` — `http://` no redirige a HTTPS. Conviene activar "Enforce HTTPS" en *Settings → Pages*.

## Detalle (carga solo cuando hace falta)

- `docs/PALETTE.md` — sistema de superficies y reglas de color
- `docs/COPY.md` — convenciones de copy (voseo, "de forma abierta", captions)
- `docs/WORKFLOW.md` — entorno del agente
- `docs/OPENGREP.md` — scan estático: `bash scripts/scan.sh` (gate CI: `--severity ERROR --error`)

## Diseño (guarda esto en cada cambio de UI)

- **El sistema manda:** color, tipografía, espaciado y radios salen de tokens. Si falta un valor, se propone un token antes de usarlo — nunca un literal nuevo suelto.
- **`DESIGN.md` es el contrato del detector `impeccable`.** Los patrones intencionales están suprimidos por archivo, con motivo. No ensanchar un ignore: un hallazgo fuera de esos patrones es un defecto real.
- **Antes de dar por cerrado un cambio de UI:** `npx -y impeccable detect chaish/` debe salir en `0`. Si se tocaron colores, correr el chequeo de contraste AA del sistema de diseño.
- El detector no evalúa composición, jerarquía ni tono: mirar la página renderizada antes de concluir.

## Posicionamiento y tono (guarda esto en cada edición de copy)

- **El sitio es político y lo dice.** La IA no es neutral y su seguridad tampoco. Nombramos las ideas y las estructuras que concentran poder: tecno-oligarquía, mito de la inevitabilidad, captura regulatoria, extractivismo, supremacismo, colonialismo. La crítica es a ideas, instituciones y sistemas, nunca a personas por nombre ni a empresas por epíteto.
- **Primera persona y proyecto propio.** Contamos lo que hacemos y por qué; el contraste se construye con nuestra práctica (comunidad, apertura, territorio, bien común), no con descalificaciones. Sin dedo acusador personal ni resentimiento.
- **Fuentes a la vista.** Toda afirmación política fuerte (un caso, una cifra, una cita, una crítica institucional) lleva enlace a la fuente, en el párrafo o en una línea «Fuente:». Sin fuente, se reformula o se saca.
- **Valores = build-fail-learn-teach en comunidad + territorio:** "Aprendizaje en comunidad", "Fallas abiertas", "Abierto a todos los niveles", "Contexto local", "Territorio y ambiente", "Agencia humana" son el corazón. No regresar a labels genéricos sin llevar esa idea.
- **Cuidado con la jerga de seguridad informática:** "credenciales" a secas suena a login. Decir "sin credenciales académicas" o reformular (p. ej. "abierto a todos los niveles"), nunca "acceso sin credenciales" solo.
- **Inclusivo con @:** "tod@s", no "todes" ni "todos".
