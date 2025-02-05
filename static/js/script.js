// Wait until the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Grab elements
    const popupOverlay = document.getElementById('popupOverlay');
    const popupBox = document.getElementById('popupBox');
    const popupTitle = document.getElementById('popupTitle');
    
    // Close buttons/methods
    const btnClosePopup = document.getElementById('btnClosePopup');
  
    // Navbar triggers
    const btnOpenLogin = document.getElementById('btnOpenLogin');
    const btnOpenSignup = document.getElementById('btnOpenSignup');
  
    // Form containers
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    const resetForm = document.getElementById('resetForm');
  
    // Switch links
    const toSignupForm = document.getElementById('toSignupForm');
    const toResetForm = document.getElementById('toResetForm');
    const backToLoginFromSignup = document.getElementById('backToLoginFromSignup');
    const backToLoginFromReset = document.getElementById('backToLoginFromReset');
  
    // Helper to open the popup with a default form
    function openPopup(formType = 'login') {
      popupOverlay.classList.add('active');
      // Little timeout to ensure overlay is visible, then show popup
      setTimeout(() => {
        popupBox.classList.add('show');
      }, 10);
  
      switchForm(formType);
    }
  
    // Helper to close the popup
    function closePopup() {
      popupBox.classList.remove('show');
      setTimeout(() => {
        popupOverlay.classList.remove('active');
      }, 300); // Match the transition duration in CSS
    }
  
    // Switch form function
    function switchForm(formType) {
      // Reset all forms to inactive
      [loginForm, signupForm, resetForm].forEach(f => {
        f.classList.remove('active');
      });
  
      if (formType === 'login') {
        loginForm.classList.add('active');
        popupTitle.textContent = 'Zaloguj się';
      } else if (formType === 'signup') {
        signupForm.classList.add('active');
        popupTitle.textContent = 'Zarejestruj się';
      } else if (formType === 'reset') {
        resetForm.classList.add('active');
        popupTitle.textContent = 'Resetuj Hasło';
      }
    }
  
    // Event listeners
    btnOpenLogin.addEventListener('click', () => openPopup('login'));
    btnOpenSignup.addEventListener('click', () => openPopup('signup'));
  
    btnClosePopup.addEventListener('click', closePopup);
  
    // Clicking outside the popup to close
    popupOverlay.addEventListener('click', (e) => {
      // If user clicks directly on the overlay (not on the popup box), close
      if (e.target === popupOverlay) {
        closePopup();
      }
    });
  
    // Press ESC key to close
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && popupOverlay.classList.contains('active')) {
        closePopup();
      }
    });
  
    // Switch links inside forms
    toSignupForm.addEventListener('click', () => switchForm('signup'));
    backToLoginFromSignup.addEventListener('click', () => switchForm('login'));
    toResetForm.addEventListener('click', () => switchForm('reset'));
    backToLoginFromReset.addEventListener('click', () => switchForm('login'));
  
    // Prevent form submissions for demonstration purposes
    /* const forms = [loginForm, signupForm, resetForm];
    forms.forEach(form => {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        alert(`Form "${form.id}" submitted!`);
        closePopup();
      });
    }); */
  });
  