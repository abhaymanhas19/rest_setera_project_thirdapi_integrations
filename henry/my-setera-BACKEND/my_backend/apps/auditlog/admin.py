from django.contrib import admin
from .models import Log

# Register your models here.
# admin.site.register(Log)


@admin.register(Log)
class LogAdmin(admin.ModelAdmin):
    list_display = ["subscription", "timestamp", "who", "message"]
    search_fields = ["subscription"]
