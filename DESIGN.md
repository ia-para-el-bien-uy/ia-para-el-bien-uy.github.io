# DESIGN.md — CHAISH (ia para el Bien / iaparaelbien.org/chaish)

Design-system contract for the impeccable detector. Encodes the deliberate
choices so `impeccable detect` scores against THIS system, not generic defaults.

The token source of truth lives in [`../design-system/`](../design-system/README.md)
(CSS + DTCG JSON + Penpot library). This file is the detector contract.

## Surfaces (exactly 3 + neutrals)
- `--white:#f0eee0` — base for ALL light sections (hero, porque, hacemos,
  fallamos, aprendemos, mision, valores, enfoque, mapa, profundizar, enlaces,
  videos, lab, sas, faq).
- `--celeste:#1a6dc4` / `--celeste-deep:#5f6b45 (oliva)` — accent, ONLY on `.cta`
  (Forma parte) and `.impact`. Text on celeste = white. The hero is WHITE (not celeste).
- `--ink:#17211e` — footer + cookie. Text on ink = white.
- Neutrals: `--muted:#5f6a5f` (secondary text on white), `--line:#e6dec9`
  (hairline borders), `--celeste-soft:#dce9e3` / `--celeste-light:#7ec4f2`
  (decorative only, not text-on-surface).

## Text rule
Dark (`--ink`/`--muted`) on cream; white on celeste/ink. Never mix on the same
family. The CTA card is the exception: ink text on `--action` yellow.

Forma: botones rectos (radio 0) y CTA como card amarilla, con radio solo en las esquinas derechas (`--radius-card-right:40px`).

## Intentional patterns — suppressed in the detector
The heuristics below fire on deliberate choices. Each is disabled **per file**
at the top of `chaish/index.html` with `impeccable-disable <rule>` and a reason.
Do not widen an ignore: a finding outside these patterns is a real defect.

- **`cramped-padding`** — `.step`, `.cap`, `.value` use `padding:26px 0` with
  `border-bottom:1px solid var(--line)`; `.cta`, `.sas-grid`, `.sas-col`,
  `.faq-list` likewise live on hairlines. This is the divider-row editorial
  pattern, not cramped padding.
- **`low-contrast` (false positive)** — the detector pairs `--muted` (#5a6a7a)
  with the action miel (#d9a441). That pairing never occurs:
  `.btn-primary` sets `color:var(--ink)`, i.e. #17211E on #d9a441 = **7.53:1**.
  Verified with [`design-system/contrast-check.mjs`](../design-system/contrast-check.mjs):
  13/14 token pairs pass AA; the only miss is the decorative hairline
  `#e8e2d6` at 1.29:1, which is exempt non-text.
- **Uppercase is reserved for short labels/headings**, not body text: `.kicker`,
  `.sas-tag`, `.sas-col .sub`, `footer h3`, `.lang-btn`. These are
  eyebrow/kicker labels (≤40 chars), not body copy.
- **Bordered-list rows use vertical-only padding** (see above).
- **Hero has NO eyebrow/kicker** — the h1 stands alone. Intentional: avoids the
  generic "AI SaaS hero eyebrow" tell.

## Real issues to keep flagging
- **Contrast regressions on new pairs** — run
  [`design-system/contrast-check.mjs`](../design-system/contrast-check.mjs).
  Least headroom: `--muted` on white 5.56:1, footer label on ink 4.60:1.
- **`layout-transition` on `.faq-a`** (`transition:max-height`) — accepted for
  now; standard accordion, low priority. If touched, prefer
  `grid-template-rows:0fr→1fr` or a transform.
- **Tight leading on display headings**: `.hero h1` stays 1.02 (large display,
  intentional). `.mission-statement h2` is **1.15** — the old note claiming 1.25
  was stale, corrected 2026-11-04 against `style.css`. Only flag body/paragraph
  text (`.lead`, `p`, `.mission-statement p`, `.vision-text`), which sit at ≥1.6.

## Detector run
From the repo root:

```bash
npx -y impeccable detect chaish/
```

- Exit codes: `0` clean · `2` findings · `1` a target could not be scanned.
- File/HTML targets run pattern rules **and** parsed-element rules. URL targets
  add rendered checks (computed contrast, tiny text) but need a launchable
  browser.
- If npx cannot write its cache (sandboxed shell), keep it in the workspace:
  `npm_config_cache=.npm-cache npx -y impeccable detect chaish/`.
- Prefer the Penpot system for design changes: update tokens first, then code.

## Not checked by the detector
Copy conventions live in `docs/COPY.md` (rioplatense voseo, "de forma abierta",
bilingual ES/EN mirroring). Keep them or the two languages drift.
