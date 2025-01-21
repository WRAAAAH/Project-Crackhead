$('#signupForm').on('submit', function (e) {
    $('#loadingSpinner').show();
    $('#submit_button').hide();
    e.preventDefault(); // Prevent the default form submission

    // Clear previous errors
    $('#signupErrors').html('');

    // Collect form data
    const formData = {
        csrfmiddlewaretoken: document.querySelector('input[name=csrfmiddlewaretoken]').value, // CSRF Token
        first_name: $('#id_first_name').val(),
        last_name: $('#id_last_name').val(),
        email: $('#id_email').val(),
        password1: $('#id_password1').val(),
        password2: $('#id_password2').val(),
    };

    // Make the AJAX POST request
    $.ajax({
        url: '/accounts/signup/',
        method: 'POST',
        data: formData,
        success: function (response) {
            if (response.success) {
                $('#loadingSpinner').hide();
                $('#submit_button').show();
                $('#signupModal').modal('hide');
                $('#loginModal').modal('show');
            }
        },
        error: function (response) {
            $('#loadingSpinner').hide();
            $('#submit_button').show();
            const errors = response.responseJSON.errors;
            for (const field in errors) {
                $('#signupErrors').append(errors[field].join('<br>') + '<br>');
            }
        },
    });
});

$('#loginForm').on('submit', function (e) {
    e.preventDefault(); // Prevent default form submission

    // Clear previous errors
    $('#loginErrors').html('');

    // Collect form data
    const formData = {
        csrfmiddlewaretoken: document.querySelector('input[name=csrfmiddlewaretoken]').value,
        login: $('#id_login_email').val(),
        password: $('#id_password').val(),
        remember: $('#id_remember').is(':checked'),
    };

    // Send AJAX POST request
    $.ajax({
        url: '/accounts/login/', // Django Allauth login endpoint
        method: 'POST',
        data: formData,
        success: function (response) {
            const data = response.responseJSON;
            // Hide the login modal
            $('#loginModal').modal('hide');

            // Dynamically update the navbar
            $('#navbar').html(`
                <div class="d-flex align-items-center">
                    <span class="me-2">Welcome, ${data.login}!</span>
                    <button id="logoutButton" class="btn btn-outline-secondary btn-sm">Logout</button>
                </div>
            `);

            // Attach logout functionality
            $('#logoutButton').on('click', function () {
                logoutUser();
            })
        },
        error: function (response) {
            const data = response.responseJSON;

            // Handle email verification required
            if (data.email_verification_required) {
                $('#loginErrors').html(`
                    <div class="text-warning mb-2">${data.message}</div>
                    <button id="resendVerificationEmail" class="btn btn-link">Resend Verification Email</button>
                `);

                // Attach click handler to resend email button
                $('#resendVerificationEmail').on('click', function () {
                    resendVerificationEmail($('#id_login_email').val());
                });
            } else if (data.errors) {
                // Handle form validation errors
                const errors = data.errors;
                for (const field in errors) {
                    $('#loginErrors').append(errors[field].join('<br>') + '<br>');
                }
            } else {
                $('#loginErrors').html('<div class="text-danger">An unexpected error occurred. Please try again.</div>');
            }
        },
    });
});

// Function to resend verification email
function resendVerificationEmail(email) {
    $.ajax({
        url: '/accounts/resend-email/', // Django Allauth resend email endpoint
        method: 'POST',
        data: {
            csrfmiddlewaretoken: document.querySelector('input[name=csrfmiddlewaretoken]').value,
            email: email,
        },
        success: function () {
            $('#loginErrors').html('<div class="text-success">Verification email has been resent. Please check your inbox.</div>');
        },
        error: function () {
            $('#loginErrors').html('<div class="text-danger">Failed to resend verification email. Please try again later.</div>');
        },
    });
}

// Logout functionality
function logoutUser() {
    $.ajax({
        url: '/accounts/logout/', // Django Allauth logout endpoint
        method: 'POST',
        data: {
            csrfmiddlewaretoken: document.querySelector('input[name=csrfmiddlewaretoken]').value,
        },
        success: function () {
            // Reload the navbar or reset it to the pre-login state
            $('#navbar').html(`
                <button id="showLoginModal" class="btn btn-primary">Login</button>
            `);

            // Attach click handler for the login modal
            $('#showLoginModal').on('click', function () {
                $('#loginModal').modal('show');
            });
        },
        error: function () {
            alert('An error occurred while logging out. Please try again.');
        },
    });
}
