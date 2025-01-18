document.addEventListener('DOMContentLoaded', function () {
    const handleFormSubmission = (formId, url, errorDivId) => {
        const form = document.getElementById(formId);
        if (form) {
            form.addEventListener('submit', function (e) {
                e.preventDefault();
                const formData = new FormData(form);
                fetch(url, {
                    method: 'POST',
                    headers: {
                        'X-Requested-With': 'XMLHttpRequest',
                    },
                    body: formData,
                })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        window.location.reload();
                    } else {
                        const errorDiv = document.getElementById(errorDivId);
                        errorDiv.innerHTML = '';
                        for (const field in data.errors) {
                            data.errors[field].forEach(error => {
                                errorDiv.innerHTML += `<p>${error}</p>`;
                            });
                        }
                    }
                });
            });
        }
    };

    handleFormSubmission('loginForm', '/accounts/login/', 'loginErrors');
    handleFormSubmission('signupForm', '/accounts/signup/', 'signupErrors');
});
