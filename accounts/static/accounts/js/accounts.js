$('#signupForm').on('submit', function (e) {
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
                alert('Signup successful!');
            }
        },
        error: function (response) {
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
        url: '/accounts/login/',  // Endpoint for login
        method: 'POST',
        data: formData,
        success: function (response) {
            if (response.success) {
                // Login successful, hide the modal and update UI
                $('#loginModal').modal('hide');
                $('#navbar').html('<span>Welcome back!</span>');  // Example: Update navbar
            }
        },
        error: function (response) {
            const data = response.responseJSON;

            // Handle email verification required
            if (data.email_verification_required) {
                // Inform the user about email verification
                $('#loginErrors').html(`
                    <div class="text-warning mb-2">${data.message}</div>
                    <button id="resendVerificationEmail" class="btn btn-link">Resend Verification Email</button>
                `);

                // Attach a click event to the Resend button
                $('#resendVerificationEmail').on('click', function () {
                    resendVerificationEmail($('#id_login_email').val());
                });
            }
            // Handle form validation errors
            else if (data.errors) {
                const errors = data.errors;
                for (const field in errors) {
                    $('#loginErrors').append(errors[field].join('<br>') + '<br>');
                }
            }
            // Handle unexpected errors
            else {
                $('#loginErrors').html('<div class="text-danger">An unexpected error occurred. Please try again.</div>');
            }
        },
    });
});

// Function to resend email verification using Allauth's built-in URL
function resendVerificationEmail(email) {
    $.ajax({
        url: '/accounts/resend-email/',  // Use Allauth's built-in resend email URL
        method: 'POST',
        data: {
            csrfmiddlewaretoken: document.querySelector('input[name=csrfmiddlewaretoken]').value,
            email: email,
        },
        success: function (response) {
            // Notify the user that the email was resent
            $('#loginErrors').html('<div class="text-success">Verification email has been resent. Please check your inbox.</div>');
        },
        error: function (response) {
            // Handle errors if the email couldn't be resent
            $('#loginErrors').html('<div class="text-danger">Failed to resend verification email. Please try again later.</div>');
        },
    });
}



$('#logoutButton').on('click', function (e) {
    e.preventDefault();

    $.ajax({
        url: '/accounts/logout/',  // django-allauth logout URL
        method: 'POST',
        data: {
            csrfmiddlewaretoken: document.querySelector('input[name=csrfmiddlewaretoken]').value,
        },
        success: function (response) {
            if (response.success) {
                alert(response.message);
                location.reload();  // Reload the page to show the logged-out state
            }
        },
    });
});
