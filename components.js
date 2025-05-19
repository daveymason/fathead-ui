/**
 * Fathead UI Components JavaScript
 * Provides functionality for interactive components
 */

document.addEventListener('DOMContentLoaded', function() {
  // Initialize Tabs
  initTabs();
  
  // Initialize Accordions
  initAccordions();
  
  // Initialize Dropdowns
  initDropdowns();
});

/**
 * Initializes tab functionality
 */
function initTabs() {
  document.querySelectorAll('.fh-ui-tabs').forEach(tabsContainer => {
    const tabs = tabsContainer.querySelectorAll('.fh-ui-tab-item');
    const panes = tabsContainer.querySelectorAll('.fh-ui-tab-pane');
    
    // Set first tab as active by default if none is active
    if (!Array.from(tabs).some(tab => tab.classList.contains('active'))) {
      tabs[0]?.classList.add('active');
      panes[0]?.classList.add('active');
    }
    
    tabs.forEach((tab, index) => {
      tab.addEventListener('click', () => {
        // Remove active class from all tabs and panes
        tabs.forEach(t => t.classList.remove('active'));
        panes.forEach(p => p.classList.remove('active'));
        
        // Add active class to clicked tab and corresponding pane
        tab.classList.add('active');
        panes[index]?.classList.add('active');
      });
    });
  });
}

/**
 * Initializes accordion functionality
 */
function initAccordions() {
  document.querySelectorAll('.fh-ui-accordion-header').forEach(header => {
    header.addEventListener('click', () => {
      const parent = header.closest('.fh-ui-accordion-item');
      const body = parent.querySelector('.fh-ui-accordion-body');
      
      // Toggle active class
      const isActive = header.classList.contains('active');
      
      // If in a single-open accordion, close other items
      const accordion = header.closest('.fh-ui-accordion');
      if (!accordion.classList.contains('fh-ui-accordion-multiple')) {
        accordion.querySelectorAll('.fh-ui-accordion-header').forEach(h => {
          if (h !== header) {
            h.classList.remove('active');
            h.closest('.fh-ui-accordion-item').querySelector('.fh-ui-accordion-body').classList.remove('active');
          }
        });
      }
      
      // Toggle this item
      header.classList.toggle('active', !isActive);
      body.classList.toggle('active', !isActive);
    });
  });
}

/**
 * Initializes dropdown functionality
 */
function initDropdowns() {
  document.querySelectorAll('.fh-ui-dropdown-toggle').forEach(toggle => {
    toggle.addEventListener('click', (e) => {
      e.preventDefault();
      const dropdown = toggle.closest('.fh-ui-dropdown');
      
      // Close other open dropdowns
      document.querySelectorAll('.fh-ui-dropdown.active').forEach(d => {
        if (d !== dropdown) {
          d.classList.remove('active');
        }
      });
      
      // Toggle this dropdown
      dropdown.classList.toggle('active');
    });
  });
  
  // Close dropdowns when clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.fh-ui-dropdown')) {
      document.querySelectorAll('.fh-ui-dropdown.active').forEach(dropdown => {
        dropdown.classList.remove('active');
      });
    }
  });
}

/**
 * Updates a progress bar value
 * @param {string} selector - CSS selector for the progress bar
 * @param {number} value - Progress value (0-100)
 */
function updateProgressBar(selector, value) {
  const progressBar = document.querySelector(selector);
  if (progressBar) {
    const clampedValue = Math.min(100, Math.max(0, value));
    progressBar.style.width = clampedValue + '%';
    
    // Update label if exists
    const container = progressBar.closest('.fh-ui-progress');
    const valueLabel = container?.querySelector('.fh-ui-progress-value');
    if (valueLabel) {
      valueLabel.textContent = clampedValue + '%';
    }
  }
}
