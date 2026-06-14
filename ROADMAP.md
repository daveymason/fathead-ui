# Fathead UI — Component Roadmap & Optimization Plan

Status date: June 2026. Companion to [FIXES.md](FIXES.md). This is the gap analysis
against "Bootstrap/Tailwind replacement" — what a real website build would reach for
and not find, plus how to make the codebase efficient enough to ship as a library.

---

## 1. Missing components — Tier 1 (you hit these on page one of any website)

| Component | Why it's needed | CSS-first approach |
|---|---|---|
| **Avatar** | User identity everywhere: navbars, comments, testimonials | Sized circle/rounded variants (`sm/md/lg`), image + initials fallback, status dot, avatar stack with negative margin |
| **Chip / Tag** | Filters, categories, selected items — distinct from Badge (badges annotate, chips are content) | Pill with optional close affordance; selectable via checkbox-hack |
| **Skeleton loader** | The HTMX story demands it — placeholder while `hx-get` swaps in | Shimmer gradient animation on `--fh-glass-bg`; text/avatar/card shapes |
| **Hamburger / off-canvas nav** | Already listed as known limitation in FIXES.md §8 — navbar wrapping to two rows doesn't scale past ~5 links | Checkbox-hack or Popover API slide-in drawer; `<dialog>` variant for free focus trap |
| **List group** | Settings pages, menus, search results — the workhorse Bootstrap component the kit lacks entirely | Glass container, φ-spaced items, hover/active/disabled states, optional icons + badges |
| **Stat / KPI card** | First thing any dashboard or landing page needs ("10k users · 99.9% uptime") | Big φ-scale number (`--fh-xl`), label, optional trend arrow + semantic color |
| **Empty state** | Every list/table needs a "nothing here yet" pattern | Centered icon + title + description + CTA button slot |
| **Hero variants** | Only the demo's own hero exists; it isn't a reusable component | Extract `.fh-ui-hero` with split (text+image), centered, and gradient variants |
| **Footer variants** | Current footer is one demo layout | Multi-column link grid, social row, legal bar — collapses to stacked on mobile |
| **Kbd + code block** | Documentation sites; the docs page styles these ad-hoc already | `kbd` keycap style, `pre` block with header bar + copy-button slot (generalize the hero's snippet box) |

## 2. Missing components — Tier 2 (marketing-site patterns)

| Component | Notes |
|---|---|
| **Pricing card / pricing table** | Tiered cards with featured-tier emphasis (scale + glow), feature checklist |
| **Testimonial card** | Quote, avatar, name/role — composes Avatar from Tier 1 |
| **Feature grid** | Icon + title + text cells; the homepage hand-rolls this today — extract it |
| **Timeline** | Vertical changelog/roadmap/history; pure CSS with `::before` spine |
| **Stepper / wizard progress** | Checkout & onboarding flows; numbered steps with done/current/upcoming states |
| **CTA banner** | Full-width gradient band with heading + button |
| **Logo cloud** | "Trusted by" strip; grayscale → color on hover |
| **Carousel** | CSS-only via `scroll-snap-x` + `scroll-marker` (2026 CSS) — no JS needed; the kit already has snap expertise |
| **FAQ section** | Native `<details>/<summary>` styled to match accordions (also FIXES.md §8 migration target) |
| **Rating stars** | Display-only (clip-path partial fill) + input variant (radio-hack) |

## 3. Missing components — Tier 3 (app/dashboard patterns)

| Component | Notes |
|---|---|
| **File upload / dropzone** | Styled `input[type=file]` via `::file-selector-button`, plus drag-area visual |
| **Search input** | Input + icon + (optional) `<datalist>` suggestions; command-palette-style dialog variant |
| **Sidebar layout** | Generalize the components-page sidebar into a reusable app shell (collapsible ≤900px, pairs with off-canvas) |
| **Definition list / description rows** | Detail pages: label/value pairs, responsive stacking |
| **Meter** | Styled native `<meter>` (distinct from progress: it shows a measurement, has free low/high/optimum semantics) |
| **Tooltip rework → Popover API + anchor positioning** | Current tooltip is title-attribute-level; `popover` + `anchor()`/`position-area` gives edge-aware flipping with zero JS |
| **Datepicker (native, themed)** | Style `input[type=date]` cross-theme; full custom picker is explicitly out of scope for CSS-first |
| **Image / figure** | `figure` + `figcaption`, aspect-ratio utilities, glass-border media frame |
| **Blockquote** | Trivial but expected; φ-indented with accent border |
| **Back-to-top button** | Pure CSS via `animation-timeline: scroll()` to fade in after scroll — great "newest CSS" showcase |

## 4. Components page revamp (make them all look beautiful)

- **One demo contract.** Every component gets the same frame: live demo on glass
  surface → copy-paste HTML snippet → variants row. Today some sections have code
  blocks, some don't, and demo backgrounds vary.
- **Copy button on every snippet** (reuse the hero's copy-button; it's already built).
- **Group the sidebar by category** — Forms / Feedback / Navigation / Surfaces /
  Data display / Layout — instead of one flat 25-item list (information scent,
  recognition over recall).
- **Checkerboard/contrast strip behind glass components** so glassmorphism is
  actually visible against a flat demo background.
- **Show each component in both themes** without toggling: a small split-preview or
  per-demo theme override (`data-theme` works on any subtree — demo that, it's a
  selling point).
- **States row per component**: default / hover / focus-visible / disabled rendered
  side by side, so keyboard styling is visible documentation, not a surprise.
- **Search/filter field** above the sidebar (can be CSS-only with `:has()` +
  checkbox per category, or 10 lines of JS).

## 5. Codebase optimization

### Architecture
- **Split the 4,300-line `fathead-ui.css` into `@layer`-ed partials**:
  `tokens.css` → `base.css` → `components/*.css` → `utilities.css`, composed with
  native `@import layer(...)`. Cascade layers end the specificity whack-a-mole that
  caused the duplicate-definition bugs fixed in FIXES.md §2.
- **Wire up the build.** `postcss.config.js` is empty — add postcss-import (inline
  the partials), autoprefixer, cssnano. Ship `dist/fathead-ui.min.css` as the one
  drop-in file; partials stay editable in `src/`.
- **Demo CSS out of the library.** `.fh-ui-component-section`, snap-dots, the
  components-page layout, `hero-cta.css`, `tabs-accordian-dropdown.css` are demo
  chrome, not kit — move to `demo.css` so consumers don't pay for them. (Also fix
  the filename typo: *accordian* → *accordion*.)
- **Subpath imports** for cherry-picking: a project that only wants buttons+forms
  imports `fathead-ui/forms.css` instead of everything.

### Size & performance
- **De-duplicate glass surfaces** with a `.fh-ui-glass` base class or
  `@layer`-friendly mixin pattern — the blur/border/background/shadow recipe is
  currently repeated ~20 times; one source of truth shrinks the file and makes
  theme changes one-line.
- **Audit `backdrop-filter` count per page.** Each blur is a GPU surface; nested
  blurs (glass card inside glass section) are the main scroll-jank risk on low-end
  phones. Rule: blur on containers, alpha-only on children.
- **Replace remaining `transition` lists** with explicit properties (no `all`),
  and keep animations compositor-only (transform/opacity).
- **Trim selector depth** — several component selectors are 3–4 compounds deep;
  with `@layer` ordering they can flatten to single classes.
- **Target**: minified+gzip core under ~12 KB (Bootstrap's grid alone is bigger;
  this is winnable and a great README number).

### Modern-CSS upgrades (the kit's whole pitch)
- **OKLCH tokens + `color-mix()`** to literally derive the palette mathematically
  (FIXES.md §8) — hue rotations by 360/φ ≈ 222.5° would make "god's number colors"
  a true claim.
- **Container queries** on cards/info-cards/stat-cards so components respond to
  their container, not the viewport — *the* drop-in guarantee.
- **`:has()`** for form-group validation styling (`.fh-ui-form-group:has(:user-invalid)`),
  removing most of `form-controls.js`.
- **`<details>/<summary>` accordions** with `::details-content` +
  `interpolate-size` animation — delete the checkbox hack where semantics exist.
- **Popover API everywhere it fits**: toasts (styles already shipped), dropdowns,
  tooltips, off-canvas — with anchor positioning. Each migration deletes
  checkbox-hack CSS *and* improves accessibility for free.
- **CSS nesting** in source partials (now baseline) — cuts repetition ~25%.

### Quality gates
- **CI smoke suite**: the zero-overflow Playwright measurement from the June audit
  (scrollHeight − clientHeight = 0 at 1366×900 and 390×844, both themes, all pages)
  as a regression test, plus stylelint and html-validate.
- **Visual regression**: headless screenshots per component section diffed against
  committed baselines — catches the "duplicate definition silently wins" class of
  bug that this codebase has been bitten by before.
- **Contrast check**: automated axe-core pass per theme.
- **Delete dead weight**: the ~170-line commented-out "LLM prompt" script in
  index.html; refresh `todo.md` and `available-html-elements.md`.

---

## Suggested order of attack

1. **Restructure first** (layers + partials + build) — adding 20 components to a
   single 4,300-line file will recreate the duplicate-definition mess.
2. **Tier 1 components** + components-page revamp (new demo contract applies to
   old and new components alike).
3. **Tier 2/3** components in marketing → app order.
4. **Modern-CSS migrations** (details/popover/has) as refactors with the CI suite
   already in place to catch regressions.

================================================================================
WORKING WITH FATHEADUI — difficulties + recommended upstream fixes  (Part 3D)
================================================================================

Context: FatheadUI is loaded from a CDN
(https://daveymason.github.io/fathead-ui/fathead-ui.css) and drives ~everything
visual. It's a CSS-first, no-build kit — which is great for this app's "no JS"
ethos — but a few sharp edges cost real time. Notes below are written so the
next person (or the FatheadUI author) can act on them.

1) Tabs ship the LOOK but not the behaviour.
   - `.fh-ui-tabs / -nav / -tab-item / -tab-pane` style tabs, and there's even a
     `.fh-ui-css-tab-input` (a visually-hidden input, clearly intended for
     CSS-only tabs) — but there are NO `:checked ~ ...` rules anywhere in the
     stylesheet that actually switch panes. Pane visibility is keyed off an
     `.active` class that only JS can add. So "CSS-only tabs" are advertised by
     the class names but not actually wired.
   - What we had to do: add our own radio-driven `:checked ~ .fh-ui-tabs-content
     #pane { display:block }` rules in application.css (see "CSS-only tabs").
   - Recommended fix: ship the `:checked` wiring for `.fh-ui-css-tab-input`
     exactly like the dialog/accordion components already do (those DO have
     `:checked +` rules). Then native CSS-only tabs would "just work".

2) backdrop-filter blur is applied too broadly and breaks compositing.
   - FatheadUI puts `backdrop-filter: blur(20px)` on cards, tables, inputs AND
     every badge. A page with dozens of badges/tiles (our report) stacks many
     blur layers; the browser compositor drops elements at random
     ("scattered / disappearing cards"). We had to globally disable it
     (`backdrop-filter: none !important` on `.fh-ui *`).
   - Recommended fix: only blur a small number of top-level surfaces (cards,
     dialogs), never badges/inline elements; or expose a `--fh-blur: 0` opt-out
     token instead of forcing per-element overrides.

3) One-shot entrance animations use `fill-mode: both` and can stick.
   - `fh-slide-up` / `fh-fade-in` leave elements at opacity:0 / offset if the
     animation is interrupted — which our meta-refresh polling does constantly.
     We had to null out `animation` on titles/cards.
   - Recommended fix: default entrance animations to `fill-mode: forwards` from a
     visible base state, or gate them behind a `data-animate` opt-in so
     auto-refreshing pages don't flicker/blank.

4) Low-contrast defaults on the light theme.
   - Table `th` text and tab-item text were washed out on `data-theme="light"`;
     we had to re-assert contrast in app CSS.
   - Recommended fix: bump default `--fh-text-secondary`/`th` contrast to meet
     WCAG AA on the light theme out of the box.

5) Component "contract" is undocumented — you reverse-engineer markup from CSS.
   - There's no per-component HTML snippet, so the required element nesting
     (e.g. dialog = hidden checkbox immediately followed by `.fh-ui-dialog`, or
     the exact tab radio/nav/content sibling order) has to be inferred by reading
     the selectors. Easy to get the sibling order subtly wrong.
   - Recommended fix: publish a tiny copy-pasteable HTML example per component
     (especially the CSS-only interactive ones), and note the sibling-order
     requirement that the `~`/`+` selectors depend on.

6) CDN-only delivery = no version pinning / offline build.
   - Loading the latest CSS from a GitHub Pages URL means an upstream change can
     silently restyle production, and there's no SRI hash or offline asset.
   - Recommended fix: publish to npm / a versioned, hashed URL so apps can pin
     (`fathead-ui@x.y.z`) and self-host through Propshaft.

Net: FatheadUI got us a polished look fast and its CSS-only dialog/accordion
patterns are genuinely nice. The main theme of the friction is "interactive
components are styled but not fully wired, and effects are applied too broadly" —
all fixable upstream without changing the no-build philosophy.