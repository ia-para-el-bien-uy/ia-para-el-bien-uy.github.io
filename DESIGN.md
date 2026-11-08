# DESIGN.md — CHAISH (iaparaelbien.org/chaish)

Contrato del detector `impeccable`: qué es intencional y por eso está suprimido. Valores y tokens:
`chaish/style.css` (`:root`) y `docs/PALETTE.md`.

## Superficies

- `--white` crema: base de toda sección clara. El hero es blanco, no celeste.
- `--action` miel: sólo `.cta`; texto `--ink`.
- `--ink`: footer y cookie, con texto blanco.
- Neutros: `--muted` (texto secundario), `--line` (hairlines).

## Regla de texto

Oscuro sobre crema; blanco sobre `--ink`. Excepción: el CTA lleva `--ink` sobre miel. Nunca blanco y
negro mezclados en la misma familia.

Forma: botones rectos (radio 0); el CTA es la única card con radio, sólo en las esquinas derechas
(`--radius-card-right`).

## Suprimido a propósito (por archivo, con motivo)

- **`cramped-padding`** — filas editoriales con padding vertical y `border-bottom`: `.step`, `.cap`,
  `.value`, `.faq-list`, `.sas-grid`, `.cta`.
- **`low-contrast`** — el detector cruza `--muted` con la miel; ese par no existe (el botón y el CTA
  llevan `--ink` sobre miel, 7.34:1).
- **Uppercase** sólo en labels cortos: `.kicker`, `.sas-tag`, `.sas-col .sub`, `footer h3`, `.lang-btn`.
- **Hero sin eyebrow/kicker** — la h1 va sola; es intencional, evita el tell de hero SaaS.

## A seguir marcando

- **Par de contraste nuevo.** Medir antes de mergear; los pares base están en `docs/PALETTE.md`.
- **Nav activo:** `live.color.jaspe` en el Penpot y `--jaspe` en el CSS, con subrayado. `live.color.accent`
  (#D13109) da 4.34:1 sobre el header y no sirve para texto normal; el color solo tampoco alcanza para
  marcar el ítem activo (WCAG 1.4.1).
- **`layout-transition` en `.faq-a`** (`max-height`): aceptado hoy; si se toca, preferir
  `grid-template-rows` o un transform.
- **Leading de display**: `.hero h1` (1.02) y `.mission-statement h2` (1.25) son intencionales. Marcar
  sólo cuerpo (`.lead`, `p`, `.vision-text`), que va ≥1.6.

## Correr el detector

```bash
npx -y impeccable detect chaish/
```

`0` limpio · `2` hallazgos · `1` target no escaneable. Baseline aceptado hoy: **2** — `overused-font`
(Space Grotesk) y `cream-palette`, decisiones de diseño ya tomadas, no defectos nuevos.
