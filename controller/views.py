# your_app/views.py
from django.shortcuts import render
from allauth.account.views import LoginView, SignupView
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from . import forms

def index(request):
    return render(request, 'index.html')

def login(request):
    return render(request, 'account/login.html')

class AjaxLoginView(LoginView):
    template_name = 'account/login.html'
    form_class = forms.CustomLoginForm

    def form_invalid(self, form):
        if self.request.is_ajax():
            return JsonResponse(form.errors, status=400)
        else:
            return super().form_invalid(form)

    def form_valid(self, form):
        response = super().form_valid(form)
        if self.request.is_ajax():
            return JsonResponse({'success': True})
        else:
            return response

class AjaxSignupView(SignupView):
    template_name = 'account/signup.html'
    form_class = forms.CustomSignupForm

    def form_invalid(self, form):
        if self.request.is_ajax():
            return JsonResponse(form.errors, status=400)
        else:
            return super().form_invalid(form)

    def form_valid(self, form):
        response = super().form_valid(form)
        if self.request.is_ajax():
            return JsonResponse({'success': True})
        else:
            return response