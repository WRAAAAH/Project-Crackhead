from allauth.account.forms import LoginForm, SignupForm
from django.contrib.auth.models import User
from django import forms


class CustomLoginForm(LoginForm):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['login'].widget.attrs.update({
            'class': 'form-control',
            'placeholder': 'Username or Email',
        })
        self.fields['password'].widget.attrs.update({
            'class': 'form-control',
            'placeholder': 'Password',
        })


class CustomSignupForm(SignupForm):
    first_name = forms.CharField(
        max_length=30,
        required=True,
        widget=forms.TextInput(attrs={
            'class': 'form-control',
            'placeholder': 'First Name',
        })
    )
    last_name = forms.CharField(
        max_length=30,
        required=True,
        widget=forms.TextInput(attrs={
            'class': 'form-control',
            'placeholder': 'Last Name',
        })
    )

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)  # Call the immediate parent (SignupForm's) __init__()
        self.fields['email'].widget.attrs.update({
            'class': 'form-control',
            'placeholder': 'Email',
        })
        self.fields['password1'].widget.attrs.update({
            'class': 'form-control',
            'placeholder': 'Password',
        })
        self.fields['password2'].widget.attrs.update({
            'class': 'form-control',
            'placeholder': 'Confirm Password',
        })

    def save(self, request):
        user = super().save(request)  # Call the parent save method
        user.first_name = self.cleaned_data['first_name']
        user.last_name = self.cleaned_data['last_name']
        user.save()
        return user

class UserUpdateForm(forms.ModelForm):
    class Meta:
        model = User
        fields = ['username', 'email']  # Exclude is_staff, is_superuser