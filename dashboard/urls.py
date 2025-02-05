from django.urls import path
from . import views

urlpatterns = [
    path('main/', views.dashboard_main, name='dashboard_main'),
    path('reflink/', views.dashboard_reflink, name='dashboard_reflink'),
    path('labconfig/', views.dashboard_labconfig, name='dashboard_labconfig'),
    path('account/', views.dashboard_account, name='dashboard_account'),
    path('INF02/pytania', views.dashboard_pytania_02, name='dashboard_pytania_02'),
    path('INF02/full_videos', views.dashboard_full_videos_02, name='dashboard_full_videos_02'),
    path('INF02/short_videos', views.dashboard_short_videos_02, name='dashboard_short_videos_02'),
    path('INF02/arkusz', views.dashboard_arkusz_02, name='dashboard_arkusz_02'),
    path('INF03/pytania', views.dashboard_pytania_03, name='dashboard_pytania_03'),
    path('INF03/full_videos', views.dashboard_full_videos_03, name='dashboard_full_videos_03'),
    path('INF03/short_videos', views.dashboard_short_videos_03, name='dashboard_short_videos_03'),
    path('INF03/arkusz', views.dashboard_arkusz_03, name='dashboard_arkusz_03'),

]