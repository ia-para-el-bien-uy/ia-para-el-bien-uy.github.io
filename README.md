# IA para el Bien · iaparaelbien.org

Sitio estático de AI Safety desde Uruguay. El hub comunitario **CHAISH** (Charrua AI Safety Hub) es el sitio
canónico: vive en `chaish/` y el root sólo redirige. HTML/CSS/JS puro, **sin build step**, deploy por GitHub Pages.

- Canónica: <https://iaparaelbien.org/chaish/>

## Estructura

```
index.html              # Redirige a chaish/ (meta refresh; CSP mínima, sin JS inline)
chaish/
  index.html            # Sitio completo CHAISH, bilingüe ES/EN, CSP en <meta>
  style.css             # Estilos del sitio canónico; tokens en :root
  assets/               # Marca y logo del hub
script.js               # Compartido: toggle ES/EN, scrollspy del nav, FAQ, cookie bar, año
CNAME                   # Dominio custom (iaparaelbien.org) para GitHub Pages
llms.txt                # Resumen del sitio para LLMs
DESIGN.md               # Contrato del design system para el detector impeccable
AGENTS.md               # Contrato del agente: fuente de verdad, deploy, tono, diseño
docs/                   # COPY, PALETTE, WORKFLOW, OPENGREP
assets/                 # Logo de la org; las páginas no lo referencian (la marca va como SVG inline)
style.css               # Resto del sitio anterior: ninguna página lo enlaza (candidato a borrar)
.opengrep/rules.yaml    # Ruleset propio: 11 reglas, invariantes del sitio
.semgrepignore
scripts/scan.sh         # Runner del scan estático (local, WSL y CI)
.github/workflows/      # Gate de opengrep en push a main y en PRs
```

## Cómo editar

1. Editar `chaish/index.html`, `chaish/style.css` o `script.js`.
2. Preview local: `python -m http.server 8099 --bind 127.0.0.1` → <http://127.0.0.1:8099/chaish/>.
3. Antes de commitear: `bash scripts/scan.sh` (ver [Seguridad](#seguridad)).
4. Commit a `main`. GitHub Pages despliega automáticamente.

## Preview

Servir el repo directamente es lo único que refleja lo que estás editando. El pipeline viejo de Firefox
Local Mode (`C:\Users\diego\ia-para-el-bien-preview` + `ia-para-el-bien-sync.sh`) está **muerto** y quedó
desincronizado — detalles en `docs/WORKFLOW.md`.

## Bilingüe

Cada texto tiene dos spans: `<span lang="es">…</span><span lang="en">…</span>`.
El CSS oculta el idioma inactivo (`html[lang="es"] [lang="en"]{display:none}`).
El toggle está en `script.js` y persiste en `localStorage` (con `try/catch`: si el storage está bloqueado,
la página sigue funcionando sin recordar la elección).

## Paleta

Los tokens son la fuente de verdad y viven en `chaish/style.css` (`:root`). La intención de superficies
(3 superficies + neutros cálidos, acentos tierra, reglas de contraste AA) está en `docs/PALETTE.md`.

No dupliques valores hex acá: se desincronizan del CSS.

## Seguridad

El sitio no tiene backend ni input de usuario; lo que hay que proteger son las invariantes.

- **Scan estático:** `bash scripts/scan.sh` — 11 reglas de opengrep, una por invariante (sinks de HTML,
  código dinámico, `target="_blank"` sin `noopener`, SRI, handlers/estilos inline, `javascript:`, `http://`,
  storage sin `try/catch`, webhooks de Discord filtrados). Detalle y triaje: `docs/OPENGREP.md`.
- **Gate de CI:** `.github/workflows/opengrep.yml` corre con opengrep pinneado + sha256 y falla con
  hallazgos **ERROR**. Baseline actual: 0 ERROR, 1 WARNING aceptado (fuente que sólo publica por `http://`).
- **CSP en `<meta>`** (Pages no permite headers): `script-src 'self'`, sin `'unsafe-inline'` ni
  `'unsafe-eval'`. Consecuencia práctica: **nada inline** — ni `style="..."` ni bloques `<script>` sin `src`;
  el CSS va por clase y el JS por `script.js`.

## Deploy

GitHub Pages desde la rama `main`, sin build step. El root redirige a `chaish/`.

Verificar el deploy es más que releer la URL: `AGENTS.md` §"Deploy y verificación" tiene el orden correcto
(remote → build de Pages → contenido vivo con cache-buster). Pages cachea 600 s, así que una lectura sin
`?cb=` puede devolver la generación anterior.
