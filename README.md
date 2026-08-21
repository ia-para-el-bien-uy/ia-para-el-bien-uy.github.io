# IA para el Bien · iaparaelbien.org

Sitio estático de AI Safety desde Uruguay. El hub comunitario **CHAISH** (Charrua AI Safety Hub) es el sitio canónico.

## Estructura

```
index.html              # Redirige a chaish/ (el sitio canónico vive en la subcarpeta)
chaish/
  index.html            # Sitio completo CHAISH, bilingüe ES/EN con toggle JS
  style.css             # Hoja de estilos del sub-sitio
  assets/chaish-mark.svg# Marca boleadoras (celeste) del hub
script.js               # Toggle idioma, menú móvil, FAQ acordeón, cookie banner
CNAME                   # Dominio custom (iaparaelbien.org) para GitHub Pages
llms.txt                # Resumen del sitio para LLMs
DESIGN.md               # Contrato de design-system para el detector impeccable
```

## Cómo editar

1. Editar `chaish/index.html`, `chaish/style.css` o `script.js`.
2. Probar localmente: `python3 -m http.server 8099 --directory .` y abrir `http://localhost:8099/chaish/`.
3. Commit a `main`. GitHub Pages despliega automáticamente.

## Preview (Firefox Local Mode)

Usuario: Firefox **Local Mode** apunta a `https://chaish.iaparaelbien.localhost` (mapea `C:\Users\diego\ia-para-el-bien-preview\chaish`).
Agente: server 8099 solo para render + Playwright.
Sync WSL→Windows: `wsl -d Ubuntu -- bash /mnt/c/Users/diego/environment/ia-para-el-bien-sync.sh`

## Bilingüe

Cada texto tiene dos spans: `<span lang="es">…</span><span lang="en">…</span>`.
El CSS oculta el idioma inactivo (`html[lang="es"] [lang="en"]{display:none}`).
El toggle está en `script.js` y persiste en `localStorage`.

## Paleta

```
--celeste:#1a6dc4       --celeste-deep:#1a5ea8
--celeste-soft:#d8ecfb  --celeste-light:#7ec4f2
--ink:#142433           --muted:#5a6a7a
--line:#e8e2d6
```

Botón primario: `#fdcd51` (amarillo, texto `--ink`). Marca del hub: SVG celeste (tres piedras enlazadas, inspirado en las boleadoras — instrumento de caza Charrúa).

## Deploy

GitHub Pages desde rama `main`. No hay build step. El root redirige a `chaish/`.
