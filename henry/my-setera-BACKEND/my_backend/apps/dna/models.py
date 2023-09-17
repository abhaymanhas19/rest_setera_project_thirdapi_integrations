from django.db import models
from apps.mobile.models import *
from django.db.models.deletion import PROTECT
from django.utils.translation import gettext_lazy as _


# Create your models here.
class provNotification(models.Model):
    subscription = models.ForeignKey("mobile.Subscription", on_delete=models.PROTECT)
    time = models.DateTimeField("Provisioning message save time", auto_now_add=True)
    order_id = models.CharField(
        "Order id for the provisioning", max_length=255, blank=True
    )
    message = models.JSONField("Provisoning message", null=True)

    def __str__(self):
        return str(self.order_id)


class serviceId(models.Model):
    subscription = models.ForeignKey("mobile.Subscription", on_delete=models.PROTECT)
    subscriptionId = models.CharField(_("Subscription id"), max_length=256, blank=False)
    cfsId = models.CharField(_("cfsId"), max_length=256, blank=True)
    serviceId = models.CharField(_("serviceId"), max_length=256, blank=True)
    active = models.BooleanField(default=True)

    def __str__(self):
        return str(self.subscriptionId)
