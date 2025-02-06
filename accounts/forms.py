import uuid
from allauth.account.forms import LoginForm, SignupForm, ResetPasswordForm
from django import forms
from django.utils.text import slugify

class CustomLoginForm(LoginForm):

    # Use email for login
    login = forms.EmailField(
        max_length=254,
        required=True,
        widget=forms.EmailInput(attrs={
            'class': 'form-control',
        }),
        label="Email",
    )

    password = forms.CharField(
        required=True,
        widget=forms.PasswordInput(attrs={
            'class': 'form-control',
        }),
    )

    def get_user(self):

        # `LoginForm` from allauth sets self.user in its own clean()
        return self.user

from allauth.account.forms import SignupForm
from django import forms
from django.core.exceptions import ValidationError
from django.utils.translation import gettext_lazy as _
from django.utils.text import slugify
import uuid

class CustomSignupForm(SignupForm):
    first_name = forms.CharField(
        max_length=30,
        required=True,
        widget=forms.TextInput(attrs={
            'class': 'form-control',
            'placeholder': 'First Name',
        }),
    )
    last_name = forms.CharField(
        max_length=30,
        required=True,
        widget=forms.TextInput(attrs={
            'class': 'form-control',
            'placeholder': 'Last Name',
        }),
    )
    email = forms.EmailField(
        max_length=254,
        required=True,
        widget=forms.EmailInput(attrs={
            'class': 'form-control',
            'placeholder': 'Email Address',
            'autocomplete': 'email',
        }),
    )

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        # Adjust widgets for the base allauth fields
        self.fields['password1'].widget = forms.PasswordInput(attrs={
            'class': 'form-control',
            'placeholder': 'Create password',
        })
        self.fields['password2'].widget = forms.PasswordInput(attrs={
            'class': 'form-control',
            'placeholder': 'Confirm password',
        })

    def clean_email(self):
        email = self.cleaned_data.get('email')
        if email and self.user_exists(email):
            raise ValidationError(
                _("An account with this email address already exists."),
                code='email_exists'
            )
        return email

    def user_exists(self, email):
        from allauth.account.models import EmailAddress
        return EmailAddress.objects.filter(email__iexact=email).exists()

    def clean_password2(self):
        """
        Ensure password1 and password2 match.
        """
        password1 = self.cleaned_data.get("password1")
        password2 = self.cleaned_data.get("password2")
        if password1 and password2 and password1 != password2:
            raise forms.ValidationError(
                "The two passwords you entered do not match. Please try again."
            )
        return password2

    def save(self, request):
        user = super().save(request)

        # Set the first/last name
        for field in ['first_name', 'last_name']:
            if field in self.cleaned_data:
                setattr(user, field, self.cleaned_data[field])

        # Auto-generate a unique username based on the email
        base_username = slugify(self.cleaned_data['email'].split('@')[0])
        unique_username = base_username
        while True:
            if not user._meta.model.objects.filter(username=unique_username).exists():
                break
            unique_username = f"{base_username}-{uuid.uuid4().hex[:6]}"

        user.username = unique_username
        user.save()
        return user


class CustomResetPasswordForm(ResetPasswordForm):
    def save(self, request):
        # Use the parent class logic
        email_address = super().save(request)

        # Log the reset request (optional)
        print(f"Password reset requested for: {email_address}")

        if hasattr(self, "users"):
            for user in self.users:
                print(f"Sending reset email to user: {user.email} (ID: {user.pk})")

        # Return the email address as required
        return email_address
