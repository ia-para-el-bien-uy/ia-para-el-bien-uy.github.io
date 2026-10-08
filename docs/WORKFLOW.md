# Entorno del agente

- **Fuente de verdad:** `C:\Users\diego\orca\ia-para-el-bien-uy.github.io` — el checkout que gestiona Orca, con remote SSH. Es el que se pushea y publica.
- El clon de WSL `~/environment/ia-para-el-bien-uy.github.io` **quedó atrás** (remote HTTPS, sin pushear nunca). No editarlo: esos commits no se publican.
- `C:\Users\diego\ia-para-el-bien-site` (sin `.git`) es un cajón de variantes HTML viejas, no un repo.
- El pipeline de sync está **muerto**: `ia-para-el-bien-sync.sh` lee de `~/environment/ia-para-el-bien-site`, que ya no existe, y `C:\Users\diego\ia-para-el-bien-preview` quedó desincronizado.
- Para previsualizar, servir el repo directamente: `python -m http.server 8099 --bind 127.0.0.1` → `http://127.0.0.1:8099/chaish/`.
- `read_file` NO ve `/home` de WSL — usar `wsl -d Ubuntu -- ...`.
- El `cd` + command-substitution en una línea rompe bajo `wsl -d Ubuntu -- bash -c '...'` — usar un script con `cd` interno.
- Ciclo push → Pages y cómo verificar: ver `AGENTS.md` §"Deploy y verificación".
