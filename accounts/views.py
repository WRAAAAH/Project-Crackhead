from allauth.account.models import EmailAddress
from allauth.account.views import LoginView, SignupView, LogoutView
from django.http import JsonResponse
from .forms import CustomLoginForm, CustomSignupForm
from ratelimit.decorators import ratelimit

class AjaxLoginView(LoginView):
    form_class = CustomLoginForm  # Add this line for consistency with SignupView

    @ratelimit(key='ip', rate='5/m', block=True)
    def form_invalid(self, form):
        # Return errors as JSON for AJAX requests
        return JsonResponse({'errors': form.errors}, status=400)

    @ratelimit(key='ip', rate='5/m', block=True)
    def form_valid(self, form):
        user = form.get_user()

        remember_me = form.cleaned_data.get('remember', False)

        email_verified = EmailAddress.objects.filter(user=user, verified=True).exists()
        if not email_verified:
            return JsonResponse({
                'success': False,
                'email_verification_required': True,
                'message': 'Your email address has not been verified. Please check your inbox.',
                'redirect_url': '/accounts/confirm-email/'
            }, status=400)

        if remember_me:
            # Set a persistent session (e.g., 30 days)
            self.request.session.set_expiry(60 * 60 * 24 * 30)
        else:
            # Set session to expire when the browser is closed
            self.request.session.set_expiry(0)
        response = super().form_valid(form)
        return JsonResponse({'success': True})



class AjaxSignupView(SignupView):
    form_class = CustomSignupForm

    @ratelimit(key='ip', rate='5/m', block=True)
    def form_invalid(self, form):
        return JsonResponse({'errors': form.errors}, status=400)

    @ratelimit(key='ip', rate='5/m', block=True)
    def form_valid(self, form):
        response = super().form_valid(form)
        return JsonResponse({'success': True})

class CustomAjaxLogoutView(LogoutView):
    def post(self, *args, **kwargs):
        response = super().post(*args, **kwargs)
        if self.request.headers.get('x-requested-with') == 'XMLHttpRequest':
            return JsonResponse({'success': True, 'message': 'Logout successful!'})
        return response