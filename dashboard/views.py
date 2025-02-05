from django.shortcuts import render

# Create your views here.
def dashboard_main(request):
    return render(request, 'dashboard/dashboard_main.html')

def dashboard_reflink(request):
    return render(request, 'dashboard/dashboard_reflink.html')

def dashboard_labconfig(request):
    return render(request, 'dashboard/dashboard_labconfig.html')

def dashboard_account(request):
    return render(request, 'dashboard/dashboard_account.html')

def dashboard_pytania_02(request):
    return render(request, 'dashboard/INF02/dashboard_pytania_02.html')

def dashboard_full_videos_02(request):
    return render(request, 'dashboard/INF02/dashboard_full_videos_02.html')

def dashboard_short_videos_02(request):
    return render(request, 'dashboard/INF02/dashboard_short_videos_02.html')

def dashboard_arkusz_02(request):
    return render(request, 'dashboard/INF02/dashboard_arkusz_02.html')

def dashboard_pytania_03(request):
    return render(request, 'dashboard/INF03/dashboard_pytania_03.html')

def dashboard_full_videos_03(request):
    return render(request, 'dashboard/INF03/dashboard_full_videos_03.html')

def dashboard_short_videos_03(request):
    return render(request, 'dashboard/INF03/dashboard_short_videos_03.html')

def dashboard_arkusz_03(request):
    return render(request, 'dashboard/INF03/dashboard_arkusz_03.html')