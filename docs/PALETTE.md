# Paleta

Exactamente **3 superficies + neutros**:

1. `--white` — base para TODAS las secciones claras
2. `--celeste:#1a6dc4` — acento (kickers, links, detalles)
3. `--ink:#142433` — oscuro, footer + cookie

Tonos derivados del acento: `--celeste-deep:#1a5ea8`, `--celeste-soft:#d8ecfb`, `--celeste-light:#7ec4f2`.

## Regla de texto

Oscuro (`--ink`/`--muted`) sobre blanco; blanco sobre celeste/ink. Nunca mezclar blanco y negro en celdas de la misma familia.

## Reglas duras

- Todos los colores como **tokens** en `:root` — cero literales hex inline (salvo el botón amarillo `#fdcd51` y los tonos del footer oscuro, intencionales).
- Botón amarillo siempre con texto oscuro (`--ink`), nunca blanco (contraste ~1.5).
- **`--sand` ELIMINADO** (usuario: "no me gusta #945d33"). No reintroducir.

## Nota

Los valores de arriba son los que están en `chaish/style.css`. Verificarlos contra el CSS antes de confiar en este archivo: la doc se desactualizó antes.
