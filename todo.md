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
- ✅ Fixed copy button functionality with minimal JavaScript
- ✅ Added proper tooltips for copy buttons with visual feedback

- ✅ Implemented CSS scroll snap:
  - Added `scroll-snap-type: y mandatory` to container
  - Applied `scroll-snap-align: start` to each section
  - Ensured one full-screen view per component

- ✅ Enhanced the homepage with scroll snap navigation dots
  - Added interactive dots to navigate between sections
  - Used IntersectionObserver for active section detection
  - Created smooth animations for transitions

- ✅ Updated theme toggle logic:
  - Persist selected theme in localStorage
  - Animate transition between themes
  
- ✅ Updated the icons in the info boxes for better visual appeal

- ✅ Enhanced HCI & microinteractions:
  - Implemented IntersectionObserver for entry animations on scroll
  - Added subtle scale/opacity transitions for sections
  - Improved hover state animations for cards, buttons, links

## Pending
- Revamp sidebar styling:
  - Modern slide-in/out for mobile
  - Add collapsible behavior
  - Use golden ratio sizing for width & padding
  - Add icons
  - Components page: group sidebar components logincally

- Component imporvements
  - Improve the spacing between paragraphs and buttons, like in the popup and buttons
  - Improve the text spacing in the cards
  - Improve the alerts components Section, Maybe just the name of the alert and the icon, press and user will see example (like toast)
  
  - Homepage improvements
   - Add here. Make footer stick to bottom of screen, have addition elements in bottom section so that footer stays on bottom page but more things in the index page footer

  - Documentation improvement
    - Ensure the padding and spacing jsut like the index page. 
    - Add the dots navigation on the side
    - Add icons just like the sidebar on /components page.

- Validate accessibility:
  - WCAG 2.1 AA contrast ratios
  - ARIA labels for navigation and toggles

- Test across screen sizes & ensure responsiveness