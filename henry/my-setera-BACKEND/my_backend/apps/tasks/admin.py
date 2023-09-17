from django.contrib import admin

# Register your models here.
from .models import Task

# Register your models here.


@admin.register(Task)
class TaskAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "order_id",
        "author_id",
        "order_product",
        "order_type",
        "order_target",
        "operator_provisioning_status",
        "odoo_provisioning_status",
        "goodsign_provisioning_status",
        "mexmanager_provisioning_status",
        "payload",
        "dna_order_id",
        "completed",
        "created",
        "updated",
    )

    search_fields = [
        "order_id",
        "order_product",
        "order_type",
        "order_target",
        "operator_provisioning_status",
        "dna_order_id",
    ]
