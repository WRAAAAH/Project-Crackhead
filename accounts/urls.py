from django.urls import path
from .views import AjaxLoginView, AjaxSignupView
from allauth.account.views import LogoutView

urlpatterns = [
    path('login/', AjaxLoginView.as_view(), name='account_login'),
    path('signup/', AjaxSignupView.as_view(), name='account_signup'),
    path('logout/', LogoutView.as_view(), name='account_logout'),
]
