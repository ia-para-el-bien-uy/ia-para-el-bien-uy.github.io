# Entorno del agente (WSL2)

- El repo vive en WSL2 (`~/environment/ia-para-el-bien-site/`). `read_file` NO ve `/home` de WSL — usar `wsl -d Ubuntu -- bash -c '...'`.
- **Sync:** source of truth es WSL. Tras cada edición: `wsl -d Ubuntu -- bash /mnt/c/Users/diego/ia-para-el-bien-sync.sh` (siempre WSL→Windows, NUNCA al revés — la copia sombra ya causó una regresión de CSS).
- Antes de editar archivos en WSL, **pull WSL→temp y verificar md5** (no editar copia sombra de Windows).
- Si promovés una variante a `index.html`, corregir su `<link stylesheet>` a `style.css` antes de borrar la variante.
- El `cd` + command-substitution en una línea rompe bajo `wsl -d Ubuntu -- bash -c '...'` — usar un script `verify.sh` con `cd` interno.
