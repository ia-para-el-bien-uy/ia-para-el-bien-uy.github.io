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
`--action`. `--arena` quedó sin uso con ese cambio: el token sigue en `:root` y en Penpot
(`live.color.arena`), pero no se reintroduce sin una decisión de diseño.

## Acento

`--celeste`, `--celeste-deep`, `--celeste-soft`: familia oliva (el nombre quedó del diseño anterior).
El azul `#1a6dc4` ya no existe en el CSS: no reintroducirlo sin una decisión de diseño.

## Texto

- `--green`, `--orange`, `--lime`: decorativos (1.1–2.8:1), nunca texto. Para texto de acento van
  `--green-text` / `--orange-text` (4.84 y 5.10:1). `--jaspe` sí alcanza AA (5.73:1).
- `--muted` y `--celeste-deep` pasan AA sobre crema al límite (~4.85:1): no usarlos en tamaños chicos.

## Reglas

- Tokens en `:root`, cero hex suelto. El CSP además prohíbe `style=""`.
- La ola del nav vive en `:root` como data URI (`--wave-nav`, oliva); el tono va codificado dentro del SVG.
  La marca de los h2 es una boleadora SVG inline (nudo y tres piedras): la geometría vive en el HTML y el color
  sale de `--marca-1/2/3` y `--marca-cord`. No hay token propio de la boleadora.
- Miel siempre con texto `--ink`, nunca blanco.
- `--sand` eliminado; no reintroducir.
- Radio 0 salvo el CTA (`--radius-card-right`).

## Tipografía

Space Grotesk para todo. Space Mono sólo en labels cortos (`.kicker`, `.sas-tag`, `.sas-col .sub`,
`footer h3`, `.lang-btn`, `.step .tag`); Anton sólo en `.statement-words`. Son Google Fonts: si cambia
la lista, actualizar el allowlist del CSP en `chaish/index.html`.
