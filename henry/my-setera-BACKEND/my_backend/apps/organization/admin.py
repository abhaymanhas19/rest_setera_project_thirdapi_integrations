from django.contrib import admin
from .models import *

# Register your models here.


@admin.register(Organization)
class OrganizationAdmin(admin.ModelAdmin):
    model = Organization
    list_display = [
        "id",
        "name",
        "reseller",
        "agent",
        "is_sale_agent",
        "is_sale_agent_organization",
        "is_sale_reseller",
        "is_sale_reseller_customer",
        "goodsign_org_identifier",
        "odoo_org_identifier",
    ]
    ordering = ("name",)
    search_fields = ["name", "agent__name", "reseller__name", "odoo_org_identifier"]
    list_filter = ["is_sale_agent", "is_sale_agent_organization", "is_sale_reseller"]
    raw_id_field = ["reseller", "agent"]
