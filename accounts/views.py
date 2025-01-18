from allauth.account.views import LoginView, SignupView
from django.http import JsonResponse
from .forms import CustomLoginForm, CustomSignupForm


from allauth.account.views import LoginView
from django.http import JsonResponse

class AjaxLoginView(LoginView):
    def form_invalid(self, form):
        return JsonResponse({'errors': form.errors}, status=400)

    def form_valid(self, form):
        response = super().form_valid(form)
        return JsonResponse({'success': True})



class AjaxSignupView(SignupView):
    form_class = CustomSignupForm

    def form_invalid(self, form):
        return JsonResponse({'errors': form.errors}, status=400)

    def form_valid(self, form):
        response = super().form_valid(form)
        return JsonResponse({'success': True})