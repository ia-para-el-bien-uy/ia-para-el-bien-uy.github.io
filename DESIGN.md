# DESIGN.md — CHAISH (iaparaelbien.org/chaish)

Contrato del detector `impeccable`: qué es intencional y por eso está suprimido. Valores y tokens:
`chaish/style.css` (`:root`) y `docs/PALETTE.md`.

## Superficies

- `--white` crema: base de toda sección clara. El hero es blanco, no celeste.
- `--action` miel: sólo `.cta` y el CTA secundario del artículo (`.btn-miel`); siempre con texto `--ink`.
- `--ink`: footer y cookie, con texto blanco.
- `--jaspe`: banda de tesis del artículo (`.band-tesis`), bloque entero con texto `--white` (5.73:1).
  Un solo momento narrativo por página, igual que en la home.
- `--celeste` oliva: cita destacada del artículo (`.quote-block`), texto `--white` (4.9:1) y barra
  izquierda de 4 px en `--action`.
- Neutros: `--muted` (texto secundario), `--line` (hairlines).

## Regla de texto

Oscuro sobre crema; blanco sobre `--ink` y sobre `--jaspe`; blanco sobre oliva en la cita del artículo.
Excepción: el CTA lleva `--ink` sobre miel. Nunca blanco y negro mezclados en la misma familia.

Forma: botones rectos (radio 0); el CTA es la única card con radio, sólo en las esquinas derechas
(`--radius-card-right`).

## Suprimido a propósito (por archivo, con motivo)

- **`cramped-padding`** — filas editoriales con padding vertical y `border-bottom`: `.step`, `.cap`,
  `.value`, `.faq-list`, `.sas-grid`, `.cta`; en el artículo, `.pipe-step`, `.limit`, `.source-item`
  y las cards con hairline.
- **`low-contrast`** — el detector cruza `--muted` con la miel; ese par no existe (el botón y el CTA
  llevan `--ink` sobre miel, 7.34:1).
- **`tight-leading`** — sólo display: `.hero h1` (1.02), `.mission-statement h2` (1.25), y en el
  artículo `.article-hero h1` (1.05), `.tesis-statement` (1.1) y `.quote-block blockquote` (1.15).
  Todo cuerpo va a 1.6–1.7.
- **Uppercase** sólo en labels cortos: `.kicker`, `.sas-tag`, `.sas-col .sub`, `footer h3`, `.lang-btn`.
- **`bounce-easing` en `.plate`** — el overshoot (`cubic-bezier(.17,.89,.32,1.28)`) es el gesto pedido para la
  entrada de las láminas; el resto del sitio no lo usa.
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

`0` limpio · `2` hallazgos · `1` target no escaneable. Baseline aceptado hoy: **2 por página** —
`overused-font` (Space Grotesk) y `cream-palette`, decisiones de diseño ya tomadas, no defectos nuevos
(hoy son 4: home + artículo).
