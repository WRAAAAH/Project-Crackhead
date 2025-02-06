from allauth.account.views import LoginView, SignupView, LogoutView
from django.http import JsonResponse
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_protect, csrf_exempt
from .forms import CustomLoginForm, CustomSignupForm
from rest_framework.throttling import AnonRateThrottle, UserRateThrottle
import json

class JSONMixin:
    def parse_json(self, request):
        try:
            return json.loads(request.body)
        except json.JSONDecodeError:
            return None

from allauth.account.views import LoginView
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt

@method_decorator(csrf_exempt, name='dispatch')
class AjaxLoginView(JSONMixin, LoginView):
    form_class = CustomLoginForm
    throttle_classes = [AnonRateThrottle, UserRateThrottle]

    def post(self, request, *args, **kwargs):
        data = self.parse_json(request)
        if data is None:
            return JsonResponse({'error': 'Invalid JSON'}, status=400)

        form = self.get_form(self.get_form_class())
        form.data = data

        if form.is_valid():
            return self.form_valid(form)
        else:
            return self.form_invalid(form)

    def form_valid(self, form):
        user = form.get_user()
        if not user.emailaddress_set.filter(verified=True).exists():
            return JsonResponse(
                {'success': False, 'message': 'Email needs to be verified.'},
                status=403
            )
        else:
            super().form_valid(form)
            return JsonResponse({'success': True, 'redirect_url': self.get_success_url()})

    def form_invalid(self, form):
        return JsonResponse({'errors': form.errors}, status=400)

    def get_success_url(self):
        return '/dashboard/main/'



@method_decorator(csrf_exempt, name='dispatch')
class AjaxSignupView(JSONMixin, SignupView):
    form_class = CustomSignupForm
    throttle_classes = [AnonRateThrottle, UserRateThrottle]

    def post(self, request, *args, **kwargs):
        data = self.parse_json(request)
        if data is None:
            return JsonResponse({'error': 'Invalid JSON'}, status=400)

        form = self.get_form(self.get_form_class())
        form.data = data

        if form.is_valid():
            return self.form_valid(form)
        else:
            return self.form_invalid(form)

    def form_valid(self, form):
        super().form_valid(form)
        return JsonResponse({'success': True})

    def form_invalid(self, form):
        return JsonResponse({'errors': form.errors}, status=400)

@method_decorator(csrf_protect, name='dispatch')
class AjaxLogoutView(LogoutView):
    def post(self, *args, **kwargs):
        super().post(*args, **kwargs)

        if self.request.headers.get('x-requested-with') == 'XMLHttpRequest':
            return JsonResponse({'success': True, 'message': 'Logout successful!'})

        return JsonResponse({'success': True, 'message': 'Logged out successfully!'})