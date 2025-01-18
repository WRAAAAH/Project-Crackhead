from django.contrib import admin
from .models import Machine

@admin.register(Machine)
class MachineAdmin(admin.ModelAdmin):
    list_display = ('name', 'description', 'created_at', 'updated_at')  # Fields to show in the admin list
    search_fields = ('name', 'description')  # Fields for search functionality
    list_filter = ('created_at',)  # Add filters for better management
