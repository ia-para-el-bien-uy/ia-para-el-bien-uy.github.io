# IA para el Bien · iaparaelbien.org

Sitio estático del laboratorio independiente de AI Safety desde Uruguay.

## Estructura

```
index.html   # Sitio completo, bilingüe ES/EN con toggle JS
style.css    # Hoja de estilos única
script.js    # Toggle idioma, menú móvil, FAQ acordeón, cookie banner
CNAME        # Dominio custom (iaparaelbien.org) para GitHub Pages
```

## Cómo editar

1. Editar `index.html`, `style.css` o `script.js` directamente.
2. Probar localmente: `python3 -m http.server 8099 --directory .` y abrir `http://localhost:8099`.
3. Commit a `main`. GitHub Pages despliega automáticamente.

## Bilingüe

Cada texto tiene dos spans: `<span lang="es">…</span><span lang="en">…</span>`.
El CSS oculta el idioma inactivo (`html[lang="es"] [lang="en"]{display:none}`).
El toggle está en `script.js` y persiste en `localStorage`.

## Paleta

```
--celeste:#2e93e6       --celeste-deep:#1a5ea8
--celeste-soft:#d8ecfb  --celeste-light:#7ec4f2
--ink:#142433           --muted:#5a6a7a
--line:#e8e2d6
```

Botón primario: `#fdcd51` (amarillo, texto `--ink`).

## Deploy

GitHub Pages desde rama `main`. No hay build step.
