from django.db import models
from django.db.models.deletion import PROTECT
from apps.organization.models import *
from django.utils.translation import gettext_lazy as _


class subscriptionDataSpeed(models.Model):
    name = models.CharField(max_length=256, blank=False, verbose_name=_("Data Speed"))
    carrier = models.ForeignKey("Carrier", on_delete=models.CASCADE)
    value = models.CharField(
        max_length=256, help_text="Download / upload speed", null=True, blank=True
    )

    def __str__(self):
        return str(f"{self.carrier} - {self.name}")

    class Meta:
        verbose_name = _("Subscription data speeds")


class subscriptionVoicePackage(models.Model):
    name = models.CharField(max_length=256, blank=False)
    carrier = models.ForeignKey("Carrier", on_delete=models.CASCADE)
    value = models.CharField(max_length=256, blank=False)

    def __str__(self):
        return str(self.name)


class SIM(models.Model):
    icc = models.CharField(max_length=256, blank=False)
    imsi = models.CharField(max_length=256, blank=True)
    puk1 = models.CharField(max_length=256, blank=False)
    puk2 = models.CharField(max_length=256, blank=False)
    acc = models.CharField(
        max_length=4, blank=True, null=True, help_text="Used for DNA. Example: 0100"
    )
    tick = models.CharField(
        max_length=3, blank=True, null=True, help_text="Used for DNA. Example: 220"
    )
    sim_type = models.CharField(
        max_length=256,
        blank=True,
        null=True,
        help_text="Used for DNA. Example: USIM-WPKI-CORP-2F3F",
    )
    last_modified = models.DateTimeField("Last modified timestamp", auto_now=True)
    created = models.DateTimeField("Initial creation timestamp", auto_now_add=True)
    organization = models.ForeignKey(
        Organization, on_delete=models.CASCADE, blank=True, default=1
    )
    available = models.BooleanField(default=True)

    def __str__(self):
        return str(self.icc)


class Subscription(models.Model):
    organization = models.ForeignKey(Organization, on_delete=models.CASCADE)
    carrier = models.ForeignKey("Carrier", on_delete=models.PROTECT)
    number = models.CharField(max_length=256, blank=False)
    sim = models.ForeignKey("SIM", on_delete=models.PROTECT)
    name = models.CharField(_("Name"), max_length=256, blank=False)
    mobile_product = models.ForeignKey(
        "mobileProduct", on_delete=models.PROTECT, blank=True, null=True
    )
    voicemail_number = models.CharField(
        _("Voicemail Number"), max_length=256, blank=True
    )
    last_modified = models.DateTimeField(
        "Last modified timestamp", auto_now=True, blank=True, null=True
    )
    created = models.DateTimeField("Initial creation timestamp", auto_now_add=True)
    subscription_open_date = models.DateTimeField(
        "Subscription open date", blank=True, null=True
    )
    subscription_close_date = models.DateTimeField(
        "Subscription close date", blank=True, null=True
    )
    active = models.BooleanField("Subscription enabled or not", default=False)
    catalog_status = models.BooleanField(_("Add to fonecta catalog"), default=False)
    barring_voice = models.ForeignKey(
        "barringVoice", on_delete=models.PROTECT, blank=True, null=True
    )
    barring_mms = models.ForeignKey(
        "barringMms", on_delete=models.PROTECT, blank=True, null=True
    )
    barring_sms = models.ForeignKey(
        "barringSms", on_delete=models.PROTECT, blank=True, null=True
    )
    barring_roaming = models.ForeignKey(
        "barringRoaming", on_delete=models.PROTECT, blank=True, null=True
    )
    barring_data = models.ForeignKey(
        "barringData", on_delete=models.PROTECT, blank=True, null=True
    )
    barring_roamingdata = models.ForeignKey(
        "barringRoamingData", on_delete=models.PROTECT, blank=True, null=True
    )
    temp_close = models.BooleanField(
        default=False, null=True, help_text="Temporarily closed"
    )
    barring_international = models.BooleanField(
        _("Barring International"),
        default=False,
        null=True,
        help_text="Barring international calls",
    )

    is_deleted = models.BooleanField(
        _("Subscription Delete"),
        default=False,
        help_text="Subscription soft delete",
    )

    sent_to_dna = models.BooleanField(
        _("Send to dna"),
        default=False,
        help_text="Data send to dna api",
    )
    certificate_status = models.BooleanField(_("Certificate Status"),default=False)
    

    def __str__(self):
        return str(self.number)


class Carrier(models.Model):
    name = models.CharField(max_length=256, blank=False)

    def __str__(self):
        return self.name


class barringVoice(models.Model):
    operator_code = models.CharField(_("Operator key"), max_length=256, blank=True)
    code = models.CharField(_("Key"), max_length=256, blank=True)
    name = models.CharField(_("Value"), max_length=256, blank=True)
    carrier = models.ForeignKey("Carrier", on_delete=models.PROTECT)

    def __str__(self):
        return str(f"{self.carrier} - {self.name}")


class barringMMS(models.Model):
    operator_code = models.CharField(_("Operator key"), max_length=256, blank=True)
    code = models.CharField(_("Key"), max_length=256, blank=True)
    name = models.CharField(_("Value"), max_length=256, blank=True)
    carrier = models.ForeignKey("Carrier", on_delete=models.PROTECT)

    def __str__(self):
        return str(f"{self.carrier} - {self.name}")


class barringSMS(models.Model):
    operator_code = models.CharField(_("Operator key"), max_length=256, blank=True)
    code = models.CharField(_("Key"), max_length=256, blank=True)
    name = models.CharField(_("Value"), max_length=256, blank=True)
    carrier = models.ForeignKey("Carrier", on_delete=models.PROTECT)

    def __str__(self):
        return str(f"{self.carrier} - {self.name}")


class barringRoaming(models.Model):
    operator_code = models.CharField(_("Operator key"), max_length=256, blank=True)
    code = models.CharField(_("Key"), max_length=256, blank=True)
    name = models.CharField(_("Value"), max_length=256, blank=True)
    carrier = models.ForeignKey("Carrier", on_delete=models.PROTECT)

    def __str__(self):
        return str(f"{self.carrier} - {self.name}")


class barringData(models.Model):
    operator_code = models.CharField(_("Operator key"), max_length=256, blank=True)
    code = models.CharField(_("Key"), max_length=256, blank=True)
    name = models.CharField(_("Value"), max_length=256, blank=True)
    carrier = models.ForeignKey("Carrier", on_delete=models.PROTECT)

    def __str__(self):
        return str(f"{self.carrier} - {self.name}")


class barringRoamingData(models.Model):
    operator_code = models.CharField(_("Operator key"), max_length=256, blank=True)
    code = models.CharField(_("Key"), max_length=256, blank=True)
    name = models.CharField(_("Value"), max_length=256, blank=True)
    carrier = models.ForeignKey("Carrier", on_delete=models.PROTECT)

    def __str__(self):
        return str(f"{self.carrier} - {self.name}")


class mobileDataCode(models.Model):
    name = models.CharField(_("Name"), max_length=256, blank=False)

    def __str__(self):
        return str(self.name)

class mobilePriority(models.Model):
    name = models.CharField(_("Name"), max_length=256, blank=False)

    def __str__(self):
        return str(self.name)


class mobileProduct(models.Model):
    name = models.CharField(_("Name"), max_length=256, blank=False)
    carrier = models.ForeignKey("Carrier", on_delete=models.PROTECT)
    datacode = models.ForeignKey(
        "mobileDataCode", on_delete=models.PROTECT, blank=True, null=True
    )
    dataspeed3GDown = models.ForeignKey(
        "subscriptionDataSpeed",
        on_delete=models.PROTECT,
        related_name="dataspeed3Gdown",
        blank=True,
        null=True,
    )
    dataspeed3GUp = models.ForeignKey(
        "subscriptionDataSpeed",
        on_delete=models.PROTECT,
        related_name="dataspeed3Gup",
        blank=True,
        null=True,
    )
    dataspeed4GDown = models.ForeignKey(
        "subscriptionDataSpeed",
        on_delete=models.PROTECT,
        related_name="dataspeed4Gdown",
        blank=True,
        null=True,
    )
    dataspeed4GUp = models.ForeignKey(
        "subscriptionDataSpeed",
        on_delete=models.PROTECT,
        related_name="dataspeed4Gup",
        blank=True,
        null=True,
    )
    voicepackage = models.ForeignKey(
        "subscriptionVoicePackage", on_delete=models.PROTECT, blank=True, null=True
    )
    priority = models.ForeignKey(
        "mobilePriority", on_delete=models.PROTECT, blank=True, null=True
    )

    def __str__(self):
        return str(f"{self.carrier} - {self.name}")


class catalogServices(models.Model):
    sub_id = models.ForeignKey(Subscription, on_delete=models.PROTECT, null=False, blank=False)
    first_name = models.CharField(
        _("First name"), max_length=256, null=True, blank=True
    )
    last_name = models.CharField(_("Last name"), max_length=256, null=True, blank=True)
    street_address = models.CharField(
        _("Street address"), max_length=256, null=True, blank=True
    )
    city = models.CharField(_("City"), max_length=256, null=True, blank=True)
    postal_code = models.CharField(
        _("Postal code"), max_length=256, null=True, blank=True
    )
