$('#loginForm').on('submit', function (e) {
    e.preventDefault();
    $.ajax({
        url: "{% url 'account_login' %}",
        method: "POST",
        data: {
            login: $('#loginUsername').val(),
            password: $('#loginPassword').val(),
            csrfmiddlewaretoken: document.querySelector('meta[name="csrf-token"]').content,
        },
        success: function (response) {
            if (response.success) {
                location.reload();
            }
        },
        error: function (response) {
            if (response.responseJSON && response.responseJSON.errors) {
                $('#loginErrors').html(
                    Object.values(response.responseJSON.errors).flat().join('<br>')
                );
            } else {
                $('#loginErrors').html('An unexpected error occurred. Please try again.');
            }
        },
    });
});

$('#signupForm').on('submit', function (e) {
    e.preventDefault(); // Prevent the default form submission behavior

    // Clear any previous errors
    $('#signupErrors').html('');

    // Perform AJAX request for signup
    $.ajax({
        url: "{% url 'account_signup' %}", // Django's signup endpoint
        method: "POST",
        data: {
            username: $('#signupUsername').val(),        // Username
            email: $('#signupEmail').val(),              // Email
            password1: $('#signupPassword1').val(),      // Password
            password2: $('#signupPassword2').val(),      // Confirm Password
            first_name: $('#signupFirstName').val(),     // First Name
            last_name: $('#signupLastName').val(),       // Last Name
            csrfmiddlewaretoken: document.querySelector('meta[name="csrf-token"]').content, // CSRF token
        },
        success: function (response) {
            if (response.success) {
                // Reload the page or redirect on success
                location.reload();
            }
        },
        error: function (response) {
            // Display validation errors dynamically
            if (response.responseJSON && response.responseJSON.errors) {
                $('#signupErrors').html(
                    Object.values(response.responseJSON.errors).flat().join('<br>')
                );
            } else {
                $('#signupErrors').html('An unexpected error occurred. Please try again.');
            }
        },
    });
});
