import uuid
from allauth.account.forms import LoginForm, SignupForm
from django import forms
from django.utils.text import slugify


class CustomLoginForm(LoginForm):
    login = forms.EmailField(
        max_length=254,
        required=True,
        widget=forms.EmailInput(attrs={
            'class': 'form-control',
            'placeholder': 'Email',
        }),
        label="Email",
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
            'placeholder': 'Email Address',
            'autocomplete': 'email',
        }),
    )

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

        self.fields['password1'].widget = forms.PasswordInput(attrs={
            'class': 'form-control',
            'placeholder': 'Create password',
        })

        self.fields['password2'].widget = forms.PasswordInput(attrs={
            'class': 'form-control',
            'placeholder': 'Confirm password',
        })

    def clean_password2(self):
        """
        Ensure password1 and password2 match.
        """
        password1 = self.cleaned_data.get("password1")
        password2 = self.cleaned_data.get("password2")
        if password1 and password2 and password1 != password2:
            raise forms.ValidationError("The two passwords you entered do not match. Please try again.")
        return password2


    def save(self, request):
        user = super().save(request)
        for field in ['first_name', 'last_name']:
            if field in self.cleaned_data:
                setattr(user, field, self.cleaned_data[field])

        # Auto-generate a unique username
        base_username = slugify(self.cleaned_data['email'].split('@')[0])  # Use part of email as base
        unique_username = base_username
        while True:  # Ensure username is unique
            if not user._meta.model.objects.filter(username=unique_username).exists():
                break
            unique_username = f"{base_username}-{uuid.uuid4().hex[:6]}"
        user.username = unique_username

        user.save()
        return user
