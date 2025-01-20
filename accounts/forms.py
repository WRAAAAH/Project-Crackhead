import uuid
from allauth.account.forms import LoginForm, SignupForm
from django import forms
from django.utils.text import slugify


class CustomLoginForm(LoginForm):
    email = forms.EmailField(
        max_length=254,
        required=True,
        widget=forms.EmailInput(attrs={
            'class': 'form-control',
            'placeholder': 'Email',
        }),
    )
    password = forms.CharField(
        required=True,
        widget=forms.PasswordInput(attrs={
            'class': 'form-control',
            'placeholder': 'Password',
        }),
    )
    remember = forms.BooleanField(
        required=False,
        widget=forms.CheckboxInput(attrs={
            'class': 'form-check-input',
        }),
        label="Remember Me"
    )

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)


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
            'placeholder': 'Email',
        }),
    )
    password1 = forms.CharField(
        required=True,
        widget=forms.PasswordInput(attrs={
            'class': 'form-control',
            'placeholder': 'Password',
        }),
    )
    password2 = forms.CharField(
        required=True,
        widget=forms.PasswordInput(attrs={
            'class': 'form-control',
            'placeholder': 'Confirm Password',
        }),
    )

    def save(self, request):
        user = super().save(request)
        user.first_name = self.cleaned_data['first_name']
        user.last_name = self.cleaned_data['last_name']

        # Auto-generate a unique username
        base_username = slugify(self.cleaned_data['email'].split('@')[0])  # Use part of email as base
        unique_username = f"{base_username}-{uuid.uuid4().hex[:6]}"  # Append a unique hash
        user.username = unique_username

        user.save()
        return user

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)