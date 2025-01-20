$('#signupForm').on('submit', function (e) {
    e.preventDefault();

    // Clear previous errors
    $('#signupErrors').html('');

    $.ajax({
        url: '/accounts/signup/',
        method: 'POST',
        data: {
            csrfmiddlewaretoken: document.querySelector('input[name=csrfmiddlewaretoken]').value,
            first_name: $('#signupFirstName').val(),
            last_name: $('#signupLastName').val(),
            email: $('#signupEmail').val(),
            password1: $('#signupPassword1').val(),
            password2: $('#signupPassword2').val(),
        },
        success: function (response) {
            $('#signupErrors').html('<div class="text-success">Signup successful! Please log in.</div>');
        },
        error: function (response) {
            let errors = response.responseJSON.errors;
            for (let field in errors) {
                $('#signupErrors').append(errors[field].join('<br>') + '<br>');
            }
        },
    });
});

$('#loginForm').on('submit', function (e) {
    e.preventDefault();

    // Clear previous errors
    $('#loginErrors').html('');

    $.ajax({
        url: '/accounts/login/',
        method: 'POST',
        data: {
            csrfmiddlewaretoken: document.querySelector('input[name=csrfmiddlewaretoken]').value,
            login: $('#loginEmail').val(),  // Email or username
            password: $('#loginPassword').val(),
            remember: $('#id_remember').is(':checked'),
        },
        success: function (response) {
            if (response.success) {
                // Update the UI to reflect the logged-in state
                $('#loginModal').modal('hide');  // Hide the login modal
                $('#navbar').html('<span>Welcome back!</span>');  // Update the navbar
            }
        },
        error: function (response) {
            let errors = response.responseJSON.errors;
            let data = response.responseJSON;
            if (data.email_verification_required) {
                // Show email verification message
                $('#loginErrors').html('<div class="text-warning">' + data.message + '</div>');
            } else if (data.errors) {
                // Show field-specific validation errors
                let errors = data.errors;
                for (let field in errors) {
                    $('#loginErrors').append(errors[field].join('<br>') + '<br>');
                }
            } else {
                $('#loginErrors').html('<div class="text-danger">An unexpected error occurred. Please try again.</div>');
            }
        },
    });
});


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
                // Show a success message and update UI
                alert(response.message);
                location.reload();  // Reload the page to show the logged-out state
            }
        },
    });
});
