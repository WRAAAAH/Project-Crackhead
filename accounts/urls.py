from django.urls import path,include
from .views import AjaxLoginView, AjaxSignupView
from allauth.account.views import LogoutView

urlpatterns = [
    path('login/', AjaxLoginView.as_view(), name='account_login'),  # Custom login view
    path('signup/', AjaxSignupView.as_view(), name='account_signup'),  # Custom signup view
    path('logout/', LogoutView.as_view(), name='account_logout'),  # Optional custom logout path
    path('', include('allauth.urls')),
]
