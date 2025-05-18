# TODO

## Completed
- ✅ Updated CSS root variables:
  - Set --fh-primary: #219EFF (light blue)
  - Set --fh-accent: #FF8A00 (complementary orange)
  - Adjusted secondary and glow colors accordingly

- ✅ Created a hero/hero-section in `index.html`:
  - Full viewport height
  - Display CDN `<link>` snippet prominently with animation
  - Added quickstart copy and buttons
  - Used full-bleed glassmorphic background

- ✅ Updated CDN links to use jsDelivr:
  - Updated in index.html
  - Updated in readme.md
  - Added alternative CDN options in documentation

- ✅ Added animated copy button with hologram effect

## Pending

- Build styled navbar below header:
  - Responsive, sticky top
  - Highlight active section on scroll
  - Use microfeedback hover effects

- Implement CSS scroll snap:
  - Add `scroll-snap-type: y mandatory` to container
  - Apply `scroll-snap-align: start` to each section
  - Ensure one full-screen view per component

- Refine spacing & layout using golden ratio:
  - Increase padding/margin between elements (var(--fh-lg), var(--fh-xl))
  - Adjust container max-width for snap sections
  - Apply consistent vertical rhythm

- Enhance HCI & microinteractions:
  - IntersectionObserver for entry animations on scroll
  - Subtle scale/opacity transitions for sections
  - Hover state animations on cards, buttons, links

- Revamp sidebar styling:
  - Modern slide-in/out for mobile
  - Add collapsible behavior
  - Use golden ratio sizing for width & padding

- Update theme toggle logic:
  - Persist selected theme in localStorage
  - Animate transition between themes

- Add footer enhancements:
  - Add social icons & links
  - Apply golden ratio spacing on footer margins

- Validate accessibility:
  - WCAG 2.1 AA contrast ratios
  - ARIA labels for navigation and toggles

- Test across screen sizes & ensure responsiveness