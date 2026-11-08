# Entorno del agente

- **Checkout único:** `C:\Users\diego\environment\ia-para-el-bien-uy.github.io`. Remote HTTPS,
  `gh` autenticado como `DiegoFleitas`; `git push origin main` funciona. Confirmar cuál es la copia
  con `git remote -v` antes de editarla.
- **Regla sobre paths:** si un doc nombra un directorio o script, verificarlo con `ls` antes de
  usarlo. Este doc listaba antes un checkout de Orca, un clon en WSL, `ia-para-el-bien-preview` y
  `ia-para-el-bien-sync.sh`: ninguno existe. Ver `AGENTS.md` § Docs.
- **Preview:** servir el repo directamente — `python -m http.server 8099 --bind 127.0.0.1` →
  `http://127.0.0.1:8099/chaish/`. No hay pipeline de sync.
- `read_file` NO ve `/home` de WSL — usar `wsl -d Ubuntu -- ...`.
- El `cd` + command-substitution en una línea rompe bajo `wsl -d Ubuntu -- bash -c '...'` — usar un
  script con `cd` interno.
- Ciclo push → Pages y cómo verificar: `AGENTS.md` §"Deploy y verificación".
