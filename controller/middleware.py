from django.conf import settings
from django.shortcuts import redirect

class LoginRequiredMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        if not request.user.is_authenticated:
            if any(request.path.startswith(path) for path in settings.RESTRICTED_PATHS):
                return redirect(settings.LOGIN_URL)
        return self.get_response(request)