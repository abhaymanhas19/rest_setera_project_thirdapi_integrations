from django.db import models
from apps.mobile.models import *
from apps.users.models import *


# Create your models here.

STATUS_STATES = [(0, "Not started"), (1, "Started"), (2, "Failed"), (3, "Ready")]


class Task(models.Model):
    order_id = models.CharField(max_length=255, blank=False)
    author_id = models.ForeignKey(
        SeteraUser, blank=True, null=True, on_delete=models.CASCADE
    )
    order_product = models.CharField(max_length=255, blank=False)
    order_type = models.CharField(max_length=255, blank=False)
    order_target = models.CharField(max_length=255, blank=False)
    operator_provisioning_status = models.IntegerField(choices=STATUS_STATES, default=0)
    odoo_provisioning_status = models.IntegerField(choices=STATUS_STATES, default=0)
    goodsign_provisioning_status = models.IntegerField(choices=STATUS_STATES, default=0)
    mexmanager_provisioning_status = models.IntegerField(
        choices=STATUS_STATES, default=0
    )
    payload = models.JSONField(blank=True)
    dna_order_id = models.CharField(max_length=255, blank=True)
    completed = models.BooleanField(help_text="Task completed or not..")
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    def __str__(self) -> str:
        return self.order_id
