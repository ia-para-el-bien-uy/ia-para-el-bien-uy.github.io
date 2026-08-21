# DESIGN.md — IA para el Bien (iaparaelbien.org)

Design-system contract for the impeccable detector. Encodes the deliberate
choices so `impeccable detect` scores against THIS system, not generic defaults.

## Surfaces (exactly 3 + neutrals)
- `--white:#ffffff` — base for ALL light sections (hero, misión, valores, enfoque,
  áreas, profundizar, videos, contribución, lab, sas, faq).
- `--celeste:#1a6dc4` / `--celeste-deep:#1a5ea8` — accent, ONLY on `.impact`
  (Quiénes somos) and `.cta`. Text on celeste = white.
- `--ink:#142433` — footer + cookie + state-of-art band. Text on ink = white.
- Neutrals: `--muted:#5a6a7a` (secondary text on white), `--line:#e8e2d6`
  (hairline borders), `--celeste-soft:#d8ecfb` / `--celeste-light:#7ec4f2`
  (decorative only, not text-on-surface).

## Text rule
Dark (`--ink`/`--muted`) on white; white on celeste/ink. Never mix on the same
family.

## Intentional patterns (DO NOT flag as anti-patterns)
- **Uppercase is reserved for short labels/headings**, not body text: `.kicker`,
  `.sas-tag`, `.brand .loc`, `footer h3`, `.lang-btn`. These are eyebrow/kicker
  labels (≤40 chars), not body copy. → `all-caps-body` should ignore these
  selectors.
- **Tight line-height on display headings is correct**: `.mission-statement h2`
  (line-height:1.15) and `.hero h1` (1.02) are large display type where tight
  leading is intentional. `tight-leading` should only apply to body/paragraph
  text (`.lead`, `p`, `.mission-statement p`, `.vision-text`), which already sit
  at ≥1.6.
- **Bordered-list rows use vertical-only padding**: `.step`, `.cap`, `.value`
  use `padding:26px 0` with `border-bottom:1px solid var(--line)` — that is a
  divider-row pattern, not "cramped". `.sas-col` uses `clamp(24px,3vw,40px)`
  horizontal inset. `cramped-padding` should not fire on these.

## Real issues to keep flagging
- `layout-transition` on `.faq-a` (`transition:max-height`) — height animation
  causes layout thrash; prefer `grid-template-rows:0fr→1fr` or transform.
  (Low priority; standard accordion. May ignore if accepted.)

## Detector run
`impeccable detect style.css index.html chaish/index.html`
Run via Hermes-bundled npx on Windows:
`/c/Users/diego/AppData/Local/hermes/node/npx -y impeccable detect <files>`
