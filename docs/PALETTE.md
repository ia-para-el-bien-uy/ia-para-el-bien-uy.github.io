# Paleta

Los valores viven en `chaish/style.css` (`:root`). Acá van los roles, no los hex.

Fuente de diseño: el archivo Penpot **`chaish`** — los sets `live`, `hybrid` y `tierra` definen estos
valores; el CSS los reproduce. Los sets `primitives`/`semantic` guardan la paleta azul anterior.

## Superficies (4)

- `--white` crema — todas las secciones claras.
- `--action` miel — sólo `.cta .wrap` y el CTA secundario del artículo (`.btn-miel`), siempre con texto `--ink`.
- `--ink` — footer, cookie, `.statement`.
- `--jaspe` — banda de tesis del artículo (`.band-tesis`), texto `--white`.

La cita destacada del artículo (`.quote-block`) va sobre `--celeste` (oliva) con texto `--white` y barra
`--action`. `--arena` volvió a usarse en la banda de marca: es el texto base de las palabras y del kicker
sobre `--ink` (ver § Texto).

## Acento

`--celeste`, `--celeste-deep`, `--celeste-soft`: familia oliva (el nombre quedó del diseño anterior).
El azul `#1a6dc4` ya no existe en el CSS: no reintroducirlo sin una decisión de diseño.

## Texto

- `--green`, `--orange`, `--lime`: decorativos (1.1–2.8:1), nunca texto. Para texto de acento van
  `--green-text` / `--orange-text` (4.84 y 5.10:1). `--jaspe` sí alcanza AA (5.73:1).
- `--muted` y `--celeste-deep` pasan AA sobre crema al límite (~4.85:1): no usarlos en tamaños chicos.
- Banda de marca (`#quienes-somos`): las tres piedras van **como texto** sobre `--ink` — `--marca-1d`
  (CH), `--marca-2` (AI), `--marca-3d` (S y H) — y el resto en `--arena`. `--marca-2` es la única piedra
  sin variante `-d`: acá va el valor base, 4.25:1 sobre ink, AA para el rótulo (44 px en el diseño, 24 en
  mobile). El color por letra vive en el CSS (`.c1/.c2/.c3`), no en un token de Penpot.

## Reglas

- Tokens en `:root`, cero hex suelto. El CSP además prohíbe `style=""`.
- La ola del nav vive en `:root` como data URI (`--wave-nav`, oliva); el tono va codificado dentro del SVG.
- La marca de boleadoras tiene **dos piezas**: el logo del nav y del footer es la boleadora dentro de un disco,
  y el marcador de lista (`.idx-mark`) y la boleadora de los h2 son la boleadora **desnuda**, sin disco. La
  geometría vive en el HTML; el color sale de `--marca-disco` + `--marca-logo-1/2/3` + `--marca-logo-cord`,
  que es un set emparejado con la superficie del disco: sobre crema el disco es tinta y las piedras aclaran
  (`--marca-1d/2d/3d`, `--marca-cordd`), en el footer el disco es crema y las piedras vuelven a
  `--marca-1/2/3` + `--marca-cord`. Los marcadores de lista nunca siguen a `--marca-logo-*`. Las filas
  `.step` de `#hacemos` reservan la columna del marcador (80 px, 48 px en ≤900) y el mark va centrado en
  ella: los valores viven en `chaish/style.css`.
- Miel siempre con texto `--ink`, nunca blanco.
- `--sand` eliminado; no reintroducir.
- Radio 0 salvo el CTA (`--radius-card-right`).

## Tipografía

Space Grotesk para todo. Space Mono sólo en labels cortos (`.kicker`, `.sas-tag`, `.sas-col .sub`,
`footer h3`, `.lang-btn`, `.step .tag`); Anton sólo en `.statement-words`. Son Google Fonts: si cambia
la lista, actualizar el allowlist del CSP en `chaish/index.html`.
