# Opengrep en este repo

Análisis estático con [opengrep](https://github.com/opengrep/opengrep) (fork open-source de
Semgrep: misma sintaxis de reglas y de CLI, sin telemetría). El repo es HTML/CSS/JS sin build,
así que el ruleset no busca "vulnerabilidades genéricas": fija **invariantes del sitio**.
Un hallazgo casi siempre significa que la invariante se rompió.

## Archivos

| Ruta | Para qué |
|------|----------|
| `.opengrep/rules.yaml` | Ruleset del repo, 11 reglas, ids `chaish-*` |
| `.semgrepignore` | Excluye prosa (`*.md`, `docs/`, `llms.txt`) y binarios del escaneo genérico |
| `scripts/scan.sh` | Runner único: local, WSL y CI |
| `.github/workflows/opengrep.yml` | Gate en `push` a `main` y en PRs |

## Correr el scan

```bash
bash scripts/scan.sh                                  # todos los hallazgos, exit 0
bash scripts/scan.sh --severity ERROR --error         # gate: falla solo con ERROR
bash scripts/scan.sh --json -o /tmp/og.json           # resultados parseables
```

Instalar el binario (v1.33.1):

- **Windows (git-bash):** `opengrep_windows_x86.exe` a `~/bin/opengrep.exe`; ya invocable como `opengrep`.
- **Linux/macOS:** `curl -fsSL https://raw.githubusercontent.com/opengrep/opengrep/main/install.sh | bash`
  o bajar `opengrep_manylinux_x86` del release y verificarlo a mano.
- Sin `opengrep` en PATH: `OPENGREP_BIN=/ruta/al/binario bash scripts/scan.sh`.

## Qué cubre el ruleset

| Regla | Severidad | Invariante |
|-------|-----------|------------|
| `chaish-dom-html-sink` | ERROR | Nada de `innerHTML`/`outerHTML`/`insertAdjacentHTML`/`document.write`: el sitio sólo pinta copy propio, así que cualquier sink convierte un futuro dato en XSS |
| `chaish-dynamic-code-exec` | ERROR | Nada de `eval`/`Function`/`setTimeout` con string: incompatible con un CSP sin `unsafe-inline` |
| `chaish-leaked-discord-webhook` | ERROR | Un webhook de Discord en el repo público es acceso de escritura para cualquiera; sólo va el invite `discord.gg/...` |
| `chaish-html-blank-target-without-noopener` | WARNING | Todo `target="_blank"` lleva `rel="noopener"` (si no, el destino controla `window.opener`) |
| `chaish-html-third-party-script-without-sri` | WARNING | Script remoto sin `integrity=`: Pages no puede mandar headers, SRI es el único control |
| `chaish-html-javascript-uri` | WARNING | Nada de `href="javascript:` — es script inline disfrazado |
| `chaish-html-inline-script` | ERROR | Nada de bloques `<script>` sin `src`: el CSP de `script-src 'self'` los bloquea en producción aunque anden en local |
| `chaish-html-inline-style-attribute` | WARNING | Nada de `style="..."`: `style-src` sin `'unsafe-inline'` descarta la declaración en producción |
| `chaish-html-inline-event-handler` | WARNING | Nada de `onclick=`/`onload=` en HTML: el comportamiento vive en `script.js` para que un CSP estricto sea posible |
| `chaish-unguarded-web-storage` | WARNING | Todo acceso a `localStorage`/`sessionStorage` va dentro de `try/catch` (storage lanza en modo privado o con datos bloqueados) |
| `chaish-html-insecure-http-reference` | WARNING | Nada de `http://` en `href`/`src`: mixed content en una página https |

## Política de severidades

- **ERROR** = regresión real, el gate de CI falla. Baseline actual: **0**.
- **WARNING** = revisar y decidir. Baseline actual: **1** (el enlace `http://` a diputados.gub.uy
  en «Proyecto de ley sobre deepfakes»; el host no sirve https en esa ruta).

El CI corre `--severity ERROR --error`: un WARNING nuevo se ve en el reporte pero no bloquea el
deploy. Si un WARNING se vuelve inaceptable, se sube la regla a `severity: ERROR`, no se agrega
un `if` en el workflow.

## Triaje de un hallazgo

1. Leer el mensaje: dice qué invariante se rompió y con qué patrón seguro reemplazarlo.
2. ¿Es real? Confirmar en el código con el `start.line` del JSON, no con grep del mensaje.
3. Arreglar la causa. Sólo si el patrón es **deliberado y seguro en contexto**, silenciar:

   ```html
   <!-- nosemgrep: chaish-html-inline-event-handler -- razón concreta -->
   ```

   Ojo: el comentario va en la línea del hallazgo o en la anterior; `nosemgrep` sin id silencia
   todas las reglas de esa línea — evitarlo.

4. No silenciar en bloque por archivo salvo que el archivo entero sea del mismo caso.

## Agregar una regla

1. Primero `grep` la superficiereal: si el sink no existe, la regla es guardarraíl (igual vale
   la pena si el patrón no debe aparecer nunca).
2. Id único con prefijo `chaish-` y el lenguaje/contexto en el nombre.
3. Validar: `opengrep validate .opengrep/rules.yaml`.
4. **Probar que dispara.** Una regla que no matchea nada es cobertura falsa. Fixture mínimo:

   ```bash
   mkdir -p /tmp/og-fix && printf '<a href="https://x" target="_blank">x</a>\n' > /tmp/og-fix/a.html
   opengrep scan -f .opengrep/rules.yaml --no-rewrite-rule-ids --no-git-ignore /tmp/og-fix
   ```

   Y probar también la línea **correcta** (debe quedar limpia) — si no, la regla no discrimina.

## CSP (en `<meta>`, porque Pages no da headers)

GitHub Pages no permite mandar `Content-Security-Policy` como header, así que la política vive en
`<meta http-equiv="Content-Security-Policy">`, una por página: `chaish/index.html` con allowlist explícita
(`default-src 'none'`, `script-src 'self'`, Google Fonts, YouTube-nocookie, `data:` para el SVG del
subrayado) y `index.html` con la mínima, porque sólo redirige.

Reglas al tocar la página:

- **Nada inline.** Un `style="..."` o un `<script>` inline rompe la política. Estilos → clase en
  `chaish/style.css` (así se sacó `style="max-width:22ch"`). El redirect del root es `<meta refresh>`,
  no JS.
- **No agregar `upgrade-insecure-requests`.** Subiría el enlace `http://` de diputados.gub.uy a https,
  y ese host tiene el TLS roto (`SEC_E_WRONG_PRINCIPAL`): el link dejaría de funcionar.
- **`frame-ancestors` y `report-uri` se ignoran en `<meta>`.** Si alguna vez importa el clickjacking,
  sólo se arregla con un proxy/CDN delante (Cloudflare ya está en los subdominios).
- **Recurso externo nuevo = actualizar el allowlist** y este doc.

Verificación (no alcanza con mirar la consola): con la página cargada, inyectar un `<script>` debe dejar
`window.__pwned` en `undefined`. Ojo: `eval()` en la consola de DevTools está exento de CSP y no prueba
nada. El detalle del chequeo completo, en la skill `static-site-csp`.

## Pitfalls locales (v1.33.1, Windows)

- `-f rules.yaml` reescribe los `check_id` con el path (`C.Users...`); `--no-rewrite-rule-ids`
  los deja estables. `scripts/scan.sh` ya lo pasa.
- `--error` falla con hallazgos de **cualquier** severidad. Para gatear sólo ERRORES:
  `--severity ERROR --error`.
- El binario es un exe nativo: con `-o /c/tmp/og.json` (path MSYS) **no escribe nada y sale 0**.
  `scripts/scan.sh` convierte el path con `cygpath`; si invocás `opengrep` a mano, pasá `C:/tmp/og.json`.
- Los patrones YAML con `: ` adentro (ej. `shell: true`) rompen el parseo: comillarlos.
- El scan sólo ve archivos trackeados por git; `--no-git-ignore` para fixtures fuera del repo.
