from django.contrib import admin

# Register your models here.
from apps.dna.models import provNotification, serviceId


@admin.register(provNotification)
class provNotificationAdmin(admin.ModelAdmin):
    list_display = ("id", "subscription", "time", "order_id", "message")
    search_fields = [
        "subscription__name",
        "subscription__voicemail_number",
        "subscription__number",
        "order_id",
        "message",
    ]


@admin.register(serviceId)
class serviceIdAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "subscription",
        "subscriptionId",
        "cfsId",
        "serviceId",
        "active",
    )
    search_fields = [
        "subscriptionId",
        "cfsId",
        "serviceId",
        "subscription__name",
        "subscription__voicemail_number",
        "subscription__number",
        "active",
    ]



from django.contrib import admin


from django.contrib.auth.admin import UserAdmin ,GroupAdmin
from django.contrib.auth.models import Group,Permission# Register your models here.


@admin.register(Permission)
class PermissionAdmin(admin.ModelAdmin):
    list_display = ['id','name']
