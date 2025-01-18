// static/js/main.js

document.addEventListener('DOMContentLoaded', function() {
    // Handle Login Form Submission
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = new FormData(loginForm);

            fetch('/accounts/login/', {
                method: 'POST',
                headers: {
                    'X-Requested-With': 'XMLHttpRequest',
                    'X-CSRFToken': getCookie('csrftoken'),
                },
                body: formData,
            })
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                return response.json().then(err => { throw err; });
            })
            .then(data => {
                if (data.success) {
                    // Reload the page or update the UI accordingly
                    window.location.reload();
                }
            })
            .catch(errors => {
                const errorDiv = document.getElementById('loginErrors');
                errorDiv.innerHTML = '';
                for (let field in errors) {
                    errors[field].forEach(error => {
                        errorDiv.innerHTML += `<p>${error}</p>`;
                    });
                }
            });
        });
    }

    // Handle Signup Form Submission
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = new FormData(signupForm);

            fetch('/accounts/signup/', {
                method: 'POST',
                headers: {
                    'X-Requested-With': 'XMLHttpRequest',
                    'X-CSRFToken': getCookie('csrftoken'),
                },
                body: formData,
            })
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                return response.json().then(err => { throw err; });
            })
            .then(data => {
                if (data.success) {
                    // Optionally, log the user in automatically or redirect
                    window.location.reload();
                }
            })
            .catch(errors => {
                const errorDiv = document.getElementById('signupErrors');
                errorDiv.innerHTML = '';
                for (let field in errors) {
                    errors[field].forEach(error => {
                        errorDiv.innerHTML += `<p>${error}</p>`;
                    });
                }
            });
        });
    }

    // Function to get CSRF token from cookies
    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
});
