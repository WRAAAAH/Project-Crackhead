# your_app/views.py
from django.shortcuts import render

def index(request):
    return render(request, 'controller/index.html')

def login(request):
    return render(request, 'account/login.html')
