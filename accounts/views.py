from allauth.account.models import EmailAddress
from allauth.account.views import LoginView, SignupView, LogoutView
from django.http import JsonResponse
from .forms import CustomLoginForm, CustomSignupForm
from rest_framework.throttling import AnonRateThrottle, UserRateThrottle
from rest_framework.views import APIView  # Use this if needed


class AjaxLoginView(LoginView):
    form_class = CustomLoginForm
    def form_invalid(self, form):
        # Return errors as JSON for AJAX requests
        return JsonResponse({'errors': form.errors}, status=400)

    def form_valid(self, form):
        email = form.cleaned_data.get('login')  # The 'login' field contains the email

        try:
            email_address = EmailAddress.objects.get(email=email)
        except EmailAddress.DoesNotExist:
            return JsonResponse({
                'success': False,
                'message': 'Invalid email or password.',
            }, status=400)
        if not email_address.verified:
            return JsonResponse({
                'success': False,
                'email_verification_required': True,
                'message': 'Your email address has not been verified. Please check your inbox.',
            }, status=400)
        # Handle 'remember me' functionality
        remember_me = form.cleaned_data.get('remember', False)
        if remember_me:
            self.request.session.set_expiry(60 * 60 * 24 * 30)  # 30 days
        else:
            self.request.session.set_expiry(0)  # Session expires on browser close

        # Proceed with the normal login process
        response = super().form_valid(form)
        return JsonResponse({'success': True})


class AjaxSignupView(SignupView):
    form_class = CustomSignupForm
    throttle_classes = [AnonRateThrottle, UserRateThrottle]  # Apply throttling here

    def form_invalid(self, form):
        return JsonResponse({'errors': form.errors}, status=400)

    def form_valid(self, form):
        response = super().form_valid(form)
        return JsonResponse({'success': True})


class CustomAjaxLogoutView(LogoutView):
    def post(self, *args, **kwargs):
        response = super().post(*args, **kwargs)
        if self.request.headers.get('x-requested-with') == 'XMLHttpRequest':
            return JsonResponse({'success': True, 'message': 'Logout successful!'})
        return response

