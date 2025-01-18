# your_app/views.py
from django.shortcuts import render

def login(request):
    return render(request, 'controller/login.html')
