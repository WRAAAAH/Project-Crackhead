from allauth.account.adapter import DefaultAccountAdapter
from django.http import JsonResponse
from django.shortcuts import resolve_url


class CustomAccountAdapter(DefaultAccountAdapter):
    def respond_email_verification_sent(self, request, user):
        return JsonResponse({
            'success': False,
            'email_verification_required': True,
            'message': 'Your email is not verified. Please check your inbox.'
        }, status=400)

    def get_login_redirect_url(self, request):
        """Ensure the user is redirected to /dashboard/main after login"""
        return resolve_url('/dashboard/main')