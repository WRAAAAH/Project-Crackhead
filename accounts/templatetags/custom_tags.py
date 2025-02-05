from django import template
from accounts.forms import CustomLoginForm, CustomSignupForm, CustomResetPasswordForm

register = template.Library()

@register.inclusion_tag('accounts/login_form.html', takes_context=True)
def render_login_form(context):
    return {'form': CustomLoginForm()}

@register.inclusion_tag('accounts/signup_form.html', takes_context=True)
def render_signup_form(context):
    """
    Template tag to render the signup form.
    """
    return {'form': CustomSignupForm()}

@register.inclusion_tag('accounts/reset_password_form.html', takes_context=True)
def render_reset_password_form(context):
    return {'form': CustomResetPasswordForm()}