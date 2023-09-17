from django.db import models
from apps.mobile.models import *
from apps.users.models import *


# Create your models here.
class Log(models.Model):
    """
    Log changes to DB
    """

    message = models.JSONField()
    who = models.ForeignKey(SeteraUser, blank=True, on_delete=models.DO_NOTHING)
    subscription = models.CharField(max_length=255, default=None)
    timestamp = models.DateTimeField("timestamp", auto_now_add=True)
    # customer = models.OneToOneField(Customer, null=True, blank=True, on_delete=models.DO_NOTHING)
    organization = models.ForeignKey(
        Organization, null=True, blank=True, on_delete=models.DO_NOTHING
    )
