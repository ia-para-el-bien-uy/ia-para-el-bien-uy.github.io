# Paleta

Exactamente **3 superficies + neutros cálidos** (adaptación "híbrido C": la marca
se mantiene, los neutros se corren hacia la familia crema/tierra).

1. `--white:#f0eee0` — **crema**; base para TODAS las secciones claras.
2. `--celeste:#1a6dc4` — **acento de marca** (no se toca); solo `.cta` e `.impact`
   como superficie.
3. `--ink:#17211e` — oscuro cálido; footer + cookie.

Tonos derivados del acento: `--celeste-deep:#5f6b45 (oliva)`, `--celeste-soft:#dce9e3`
(salvia), `--celeste-light:#7ec4f2`.

Acentos tierra (nuevos): `--green:#7c9a3e`, `--green-text:#55701f`,
`--lime:#efffc1`, `--sage:#b9d7d1`, `--orange:#e56a3e`, `--orange-text:#a8451c`.
Acción: `--action:#d9a441`, `--action-hover:#c08b2e`.

## Regla de texto

Oscuro (`--ink`/`--muted`) sobre crema; blanco sobre celeste/ink. Nunca mezclar
blanco y negro en celdas de la misma familia.

**Ojo con los acentos tierra:** `--green` y `--orange` son *decorativos*
(~3:1 sobre crema). Para texto usá sus variantes `-text` (`#55701f` 5.27:1,
`#b84a1f` 4.86:1). Tinta oscura sobre verde/lima/salvia sí pasa AA.

## Reglas duras

- Todos los colores como **tokens** en `:root` — cero literales hex inline.
- Botón amarillo siempre con texto oscuro (`--ink`), nunca blanco.
- **`--sand` ELIMINADO** (usuario: "no me gusta #945d33"). No reintroducir.
- El celeste de CHAISH **no se reemplaza**: sigue siendo el acento de marca.

## Tipografía

`--font:"Space Grotesk"` para todo el texto; `--font-mono:"Space Mono"` reservada a
labels cortos (`.kicker`, `.sas-tag`, `.sas-col .sub`, `footer h3`, `.lang-btn`,
`.step .tag`). Ambas son Google Fonts (OFL).

## Nota

Los valores de arriba son los que están en `chaish/style.css`. Verificarlos contra
el CSS antes de confiar en este archivo: la doc se desactualizó antes.

Forma: botones rectos (radio 0) y CTA card `--action` con radio solo en las esquinas derechas (`--radius-card-right:40px`).
