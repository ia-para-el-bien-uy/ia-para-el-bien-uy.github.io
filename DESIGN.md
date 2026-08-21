# DESIGN.md — CHAISH (ia para el Bien / chaish.iaparaelbien.localhost)

Design-system contract for the impeccable detector. Encodes the deliberate
choices so `impeccable detect` scores against THIS system, not generic defaults.

## Surfaces (exactly 3 + neutrals)
- `--white:#ffffff` — base for ALL light sections (hero, porque, hacemos,
  fallamos, aprendemos, mision, valores, enfoque, profundizar, videos, lab, sas, faq).
- `--celeste:#1a6dc4` / `--celeste-deep:#1a5ea8` — accent, ONLY on `.cta`
  (Forma parte). Text on celeste = white. The hero is WHITE (not celeste).
- `--ink:#142433` — footer + cookie. Text on ink = white.
- Neutrals: `--muted:#5a6a7a` (secondary text on white), `--line:#e8e2d6`
  (hairline borders), `--celeste-soft:#d8ecfb` / `--celeste-light:#7ec4f2`
  (decorative only, not text-on-surface).

## Text rule
Dark (`--ink`/`--muted`) on white; white on celeste/ink. Never mix on the same
family.

## Intentional patterns (DO NOT flag as anti-patterns)
- **Uppercase is reserved for short labels/headings**, not body text: `.kicker`,
  `.sas-tag`, `.sas-col .sub`, `footer h3`, `.lang-btn`. These are eyebrow/kicker
  labels (≤40 chars), not body copy. → `all-caps-body` should ignore these
  selectors. (The brand mark is a celeste bolas SVG, no text "UY" — `.brand .loc`
  does not apply on this site.)
- **Bordered-list rows use vertical-only padding**: `.step`, `.cap`, `.value`
  use `padding:26px 0` with `border-bottom:1px solid var(--line)` — that is a
  divider-row pattern, not "cramped". `.sas-col` uses `clamp(24px,3vw,40px)`
  horizontal inset. `cramped-padding` should not fire on these (the hairline
  divider-row look is deliberate editorial style).
- **Hero has NO eyebrow/kicker** — the h1 stands alone. This is intentional
  (avoids the generic "AI SaaS hero eyebrow" tell).

## Real issues to keep flagging
- `layout-transition` on `.faq-a` (`transition:max-height`) — height animation
  causes layout thrash; prefer `grid-template-rows:0fr→1fr` or transform.
  (Low priority; standard accordion. May ignore if accepted.)
- `tight-leading` on display headings: `.mission-statement h2` is now 1.25
  (was 1.15, corrected). `.hero h1` stays 1.02 (large display, intentional).
  Only flag body/paragraph text (`.lead`, `p`, `.mission-statement p`,
  `.vision-text`), which sit at ≥1.6.

## Detector run
`impeccable detect style.css index.html chaish/index.html`
Run via Hermes-bundled npx on Windows:
`/c/Users/diego/AppData/Local/hermes/node/npx -y impeccable detect <files>`
