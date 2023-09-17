from django.contrib import admin
from .models import *

# Register your models here.


@admin.register(subscriptionDataSpeed)
class SubscriptionDataSpeedAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "carrier", "value")
    search_fields = ["name", "carrier__name", "value"]


@admin.register(subscriptionVoicePackage)
class SubscriptionVoicePackageAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "carrier", "value")
    search_fields = ["name", "carrier__name", "value"]


@admin.register(SIM)
class SimAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "icc",
        "imsi",
        "puk1",
        "puk2",
        "acc",
        "tick",
        "sim_type",
        "last_modified",
        "created",
        "organization",
        "available",
    )
    search_fields = [
        "icc",
        "imsi",
        "puk1",
        "puk2",
        "acc",
        "tick",
        "sim_type",
        "organization__name",
    ]


@admin.register(Subscription)
class SubscriptionAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "organization",
        "carrier",
        "number",
        "sim",
        "name",
        "mobile_product",
        "voicemail_number",
        "last_modified",
        "created",
        "subscription_open_date",
        "subscription_close_date",
        "active",
        "catalog_status",
        "barring_voice",
        "barring_mms",
        "barring_sms",
        "barring_roaming",
        "barring_data",
        "barring_roamingdata",
        "temp_close",
        "barring_international",
        "is_deleted",
    )
    search_fields = [
        "number",
        "name",
        "voicemail_number",
        "organization__name",
        "carrier__name",
        "active",
        "sim__icc",
        "sim__imsi",
        "sim__puk1",
        "sim__puk2",
        "sim__sim_type",
    ]


@admin.register(Carrier)
class CarrierAdmin(admin.ModelAdmin):
    list_display = ("id", "name")
    search_fields = [
        "name",
    ]


@admin.register(barringVoice)
class barringVoiceAdmin(admin.ModelAdmin):
    search_fields = ["operator_code", "code", "name", "carrier__name"]
    list_display = ("id", "operator_code", "code", "name", "carrier")


@admin.register(barringMMS)
class barringMMSAdmin(admin.ModelAdmin):
    search_fields = ["operator_code", "code", "name", "carrier__name"]
    list_display = ("id", "operator_code", "code", "name", "carrier")


@admin.register(barringSMS)
class barringSMSAdmin(admin.ModelAdmin):
    search_fields = ["operator_code", "code", "name", "carrier__name"]
    list_display = ("id", "operator_code", "code", "name", "carrier")


@admin.register(barringRoaming)
class barringRoamingAdmin(admin.ModelAdmin):
    search_fields = ["operator_code", "code", "name", "carrier__name"]
    list_display = ("id", "operator_code", "code", "name", "carrier")


@admin.register(barringData)
class barringDataAdmin(admin.ModelAdmin):
    search_fields = ["operator_code", "code", "name", "carrier__name"]
    list_display = ("id", "operator_code", "code", "name", "carrier")


@admin.register(barringRoamingData)
class barringRoamingDataAdmin(admin.ModelAdmin):
    search_fields = ["operator_code", "code", "name", "carrier__name"]
    list_display = ("id", "operator_code", "code", "name", "carrier")


@admin.register(mobileDataCode)
class mobileDataCodeAdmin(admin.ModelAdmin):
    search_fields = [
        "name",
    ]
    list_display = ("id", "name")


@admin.register(mobilePriority)
class mobilePriorityAdmin(admin.ModelAdmin):
    search_fields = [
        "name",
    ]
    list_display = ("id", "name")


@admin.register(mobileProduct)
class mobileProductAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "name",
        "carrier",
        "datacode",
        "dataspeed3GDown",
        "dataspeed3GUp",
        "dataspeed4GDown",
        "dataspeed4GUp",
        "voicepackage",
        "priority",
    )

    search_fields = [
        "name",
        "carrier__name",
        "datacode__name",
        "dataspeed3GDown__name",
        "dataspeed3GUp__name",
        "dataspeed4GDown__name",
        "dataspeed4GUp__name",
        "voicepackage__name",
        "priority__name",
        "dataspeed3GDown__value",
        "dataspeed3GUp__value",
        "dataspeed4GDown__value",
        "dataspeed4GUp__value",
        "voicepackage__value",
    ]


@admin.register(catalogServices)
class catelogserviceadmin(admin.ModelAdmin):
    list_display = ["id", "sub_id", "first_name"]
