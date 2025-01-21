from django.urls import path,include
from . import views
from allauth.account.views import LogoutView

urlpatterns = [
    path('login/', views.AjaxLoginView.as_view(), name='account_login'),  # Custom login view
    path('signup/', views.AjaxSignupView.as_view(), name='account_signup'),  # Custom signup view
    path('logout/', views.AjaxLogoutView.as_view(), name='account_logout'),  # Optional custom logout path
    path('', include('allauth.urls')),
]
