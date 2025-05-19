/**
 * Fathead UI Form Controls
 * Minimal CSS-first enhancements for form elements
 */

document.addEventListener('DOMContentLoaded', function() {
  // Range slider value display
  const rangeSliders = document.querySelectorAll('.fh-ui-range');
  
  rangeSliders.forEach(slider => {
    const valueDisplay = slider.nextElementSibling;
    if (valueDisplay && valueDisplay.classList.contains('fh-ui-range-value')) {
      // Set initial value
      valueDisplay.textContent = `${slider.value}%`;
      
      // Position the value display
      const percent = (slider.value - slider.min) / (slider.max - slider.min) * 100;
      valueDisplay.style.left = `${percent}%`;
      
      // Update on change
      slider.addEventListener('input', () => {
        valueDisplay.textContent = `${slider.value}%`;
        const percent = (slider.value - slider.min) / (slider.max - slider.min) * 100;
        valueDisplay.style.left = `${percent}%`;
      });
      
      // Show value on focus/hover
      slider.addEventListener('mouseenter', () => {
        valueDisplay.style.opacity = '1';
      });
      
      slider.addEventListener('focus', () => {
        valueDisplay.style.opacity = '1';
      });
      
      slider.addEventListener('mouseleave', () => {
        if (document.activeElement !== slider) {
          valueDisplay.style.opacity = '0';
        }
      });
      
      slider.addEventListener('blur', () => {
        if (!slider.matches(':hover')) {
          valueDisplay.style.opacity = '0';
        }
      });
    }
  });
  
  // Form validation example - for demo purposes
  const inputs = document.querySelectorAll('.fh-ui-input, .fh-ui-textarea, .fh-ui-select');
  
  inputs.forEach(input => {
    input.addEventListener('blur', () => {
      // Skip validation for inputs that already have a validation class
      if (input.classList.contains('valid') || input.classList.contains('invalid')) {
        return;
      }
      
      // For demo purposes: validate email format if it's an email field
      if (input.type === 'email' && input.value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailRegex.test(input.value)) {
          input.classList.add('valid');
          const helpText = input.closest('.fh-ui-form-group').querySelector('.fh-ui-form-help');
          if (helpText) {
            helpText.classList.add('valid');
            helpText.classList.remove('error');
            helpText.textContent = 'Valid email address';
          }
        } else {
          input.classList.add('invalid');
          const helpText = input.closest('.fh-ui-form-group').querySelector('.fh-ui-form-help');
          if (helpText) {
            helpText.classList.add('error');
            helpText.classList.remove('valid');
            helpText.textContent = 'Please enter a valid email address';
          }
        }
      }
    });
  });
});
