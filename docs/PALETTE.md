# Paleta — sistema de 3 superficies

Unificado tras feedback de coherencia. Exactamente **3 superficies + neutros**:

1. `--white` — base para TODAS las secciones claras
2. `--celeste:#2e93e6` — acento, SOLO en Quiénes somos (impact) y CTA
3. `--ink:#142433` — oscuro, footer + cookie + banda estado del arte

## Regla de texto
Oscuro (`--ink`/`--muted`) sobre blanco; blanco sobre celeste/ink. Nunca mezclar blanco y negro en celdas de la misma familia.

## Reglas duras
- Todos los colores como **tokens** en `:root` — cero literales hex inline (salvo botón amarillo `#fdcd51` y tonos del footer oscuro, intencionales).
- Botón amarillo siempre con texto oscuro (`--ink`), nunca blanco (contraste ~1.5).
- **`--sand` ELIMINADO** (usuario: "no me gusta #945d33"). No reintroducir.
