document.addEventListener('DOMContentLoaded', () => {

    const signupForm = document.querySelector('#signupForm');
    signupForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        /* const signupErrors = document.querySelector('#signupErrors');
        signupErrors.innerHTML = ''; */

        const csrfToken = document.querySelector('input[name=csrfmiddlewaretoken]').value;
        const first_name = document.querySelector('#signupFirstName').value;
        const last_name = document.querySelector('#signupSurname').value;
        const email = document.querySelector('#signupEmail').value;
        const password1 = document.querySelector('#signupPassword').value;
        const password2 = document.querySelector('#signupRepeatPassword').value;
        const signupFormData = new URLSearchParams();

        signupFormData.append('csrfmiddlewaretoken', csrfToken);
        signupFormData.append('first_name', first_name);
        signupFormData.append('last_name', last_name);
        signupFormData.append('email', email);
        signupFormData.append('password1', password1);
        signupFormData.append('password2', password2);

        try {
            const response = await fetch('/accounts/signup/', {
                method: 'POST',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                body: signupFormData.toString(),
            });
            const data = await response.json();
            if (!response.ok) throw data;
            const modal = document.getElementById('signupModal');
            if (modal) modal.style.display = 'none';
        } catch (err) {
            if (err.error) {
                for (const field in err.errors) {
                    // signupErrors.innerHTML = err.errors[field].join('<br>') + '<br>';
                }
            } else if (err.message) {
                // signupErrors.innerHTML = `<div class="text-danger">${err.message}</div>`;
            } else {
                // signupErrors.innerHTML = '<div class="text-danger">An unexpected error occurred. Please try again.</div>';
            }
        }
    })

    const loginForm = document.getElementById('loginForm');
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        /* const loginErrors = document.getElementById('loginErrors');
        loginErrors.innerHTML = ''; */

        const csrfToken = document.querySelector('input[name=csrfmiddlewaretoken]').value;
        const loginValue = document.getElementById('loginEmail').value;
        const passwordValue = document.getElementById('loginPassword').value;
        // const rememberValue = document.getElementById('id_remember').checked;
        const loginFormData = new URLSearchParams();

        loginFormData.append('csrfmiddlewaretoken', csrfToken);
        loginFormData.append('login', loginValue);
        loginFormData.append('password', passwordValue);
        // loginFormData.append('remember', rememberValue);

        try {
            const response = await fetch('/accounts/login/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: loginFormData.toString(),
            });
            const data = await response.json();
            if (!response.ok) throw data;
            const modal = document.getElementById('loginModal');
            if (modal) modal.style.display = 'none';
        } catch (err) {
              if (err.email_verification_required) {
                  // loginErrors.innerHTML = `<div class="text-warning mb-2">${err.message}</div>`;
                document.getElementById('resendVerificationEmail').addEventListener('click', () => {
                    resendVerificationEmail(loginValue);
                });
              } else if (err.errors) {
                  for (const field in err.errors) {
                      // loginErrors.innerHTML += err.errors[field].join('<br>') + '<br>';
                  }
              } else if (err.message) {
                  // loginErrors.innerHTML = `<div class="text-danger">${err.message}</div>`;
              } else {
                  // loginErrors.innerHTML = '<div class="text-danger">An unexpected error occurred. Please try again.</div>';
              }
        }
    });
});

/* veryfikacja spermy
async function resendVerificationEmail(email) {
    try {
        const csrfToken = document.querySelector('input[name=csrfmiddlewaretoken]').value;

        const response = await fetch('/accounts/resend-email/', {
            method: 'POST',
            headers: {
                'X-CSRFToken': csrfToken,
            },
            body: JSON.stringify({ email: email }),
        });

        if (response.ok) {
            document.querySelector('#loginErrors').innerHTML = '<div class="text-success">Verification email has been resent. Please check your inbox.</div>';
        } else {
            throw new Error('Failed to resend verification email.');
        }
    } catch (error) {
        console.error('Error resending verification email:', error);
        document.querySelector('#loginErrors').innerHTML = '<div class="text-danger">Failed to resend verification email. Please try again later.</div>';
    }
} */

async function logoutUser() {
    const csrfToken = document.querySelector('input[name=csrfmiddlewaretoken]').value;
    try {
        const response = await fetch('/accounts/logout/', {
            method: 'POST',
            headers: {
                'X-CSRFToken': csrfToken,
            },
        });
        const data = await response.json();
        if (!response.ok) throw data;
    } catch (err) {
        if (err.errors) {
            throw new Error('logout failed');
        }
    }
}
