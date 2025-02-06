document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.querySelector('#signupForm');
    signupForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const csrfToken = document.querySelector('input[name=csrfmiddlewaretoken]').value;
        const formData = {
            first_name: document.querySelector('#signupFirstName').value,
            last_name: document.querySelector('#signupSurname').value,
            email: document.querySelector('#signupEmail').value,
            password1: document.querySelector('#signupPassword').value,
            password2: document.querySelector('#signupRepeatPassword').value,
        };

        try {
            const response = await fetch('/accounts/signup/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrfToken,
                    'X-Requested-With': 'XMLHttpRequest',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            if (!response.ok) throw data;

        } catch (err) {
            console.error('Signup Error:', err);
        }
    });

    const loginForm = document.getElementById('loginForm');
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const csrfToken = document.querySelector('input[name=csrfmiddlewaretoken]').value;
        const formData = {
            login: document.getElementById('loginEmail').value,
            password: document.getElementById('loginPassword').value,
        };

        try {
            const response = await fetch('/accounts/login/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrfToken,
                    'X-Requested-With': 'XMLHttpRequest',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            if (!response.ok) throw data;

        } catch (err) {
            console.error('Login Error:', err);
        }
    });
});


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
}

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

        window.location.reload();

    } catch (err) {
        console.error('Logout Error:', err);
    }
}
