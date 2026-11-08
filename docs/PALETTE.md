# Paleta

Los valores viven en `chaish/style.css` (`:root`). Acá van los roles, no los hex.

Fuente de diseño: el archivo Penpot **`chaish`** — los sets `live`, `hybrid` y `tierra` definen estos
valores; el CSS los reproduce. Los sets `primitives`/`semantic` guardan la paleta azul anterior.

## Superficies (3)

- `--white` crema — todas las secciones claras.
- `--action` miel — sólo `.cta .wrap`, siempre con texto `--ink`.
- `--ink` — footer, cookie, `.statement`.

## Acento

`--celeste`, `--celeste-deep`, `--celeste-soft`: familia oliva (el nombre quedó del diseño anterior).
El azul `#1a6dc4` ya no existe en el CSS: no reintroducirlo sin una decisión de diseño.

## Texto

- `--green`, `--orange`, `--lime`: decorativos (1.1–2.8:1), nunca texto. Para texto de acento van
  `--green-text` / `--orange-text` (4.84 y 5.10:1). `--jaspe` sí alcanza AA (5.73:1).
- `--muted` y `--celeste-deep` pasan AA sobre crema al límite (~4.85:1): no usarlos en tamaños chicos.

## Reglas

- Tokens en `:root`, cero hex suelto. El CSP además prohíbe `style=""`.
- Miel siempre con texto `--ink`, nunca blanco.
- `--sand` eliminado; no reintroducir.
- Radio 0 salvo el CTA (`--radius-card-right`).

## Tipografía

Space Grotesk para todo. Space Mono sólo en labels cortos (`.kicker`, `.sas-tag`, `.sas-col .sub`,
`footer h3`, `.lang-btn`, `.step .tag`); Anton sólo en `.statement-words`. Son Google Fonts: si cambia
la lista, actualizar el allowlist del CSP en `chaish/index.html`.
