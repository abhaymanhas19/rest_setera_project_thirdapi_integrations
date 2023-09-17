from django.db import models

# Create your models here.


class Organization(models.Model):
    name = models.CharField(max_length=255, unique=True)
    is_sale_agent = models.BooleanField(default=False)
    is_sale_agent_organization = models.BooleanField(default=False)
    agent = models.ForeignKey(
        "self", related_name="Agent", null=True, blank=True, on_delete=models.CASCADE
    )
    is_sale_reseller = models.BooleanField(default=False)
    is_sale_reseller_customer = models.BooleanField(default=False)
    reseller = models.ForeignKey(
        "self", related_name="Reseller", null=True, blank=True, on_delete=models.CASCADE
    )
    goodsign_org_identifier = models.IntegerField(default=0)
    odoo_org_identifier = models.IntegerField(default=0)
    information = models.TextField(blank=True, null=True)

    def __str__(self):
        return str(self.name)
