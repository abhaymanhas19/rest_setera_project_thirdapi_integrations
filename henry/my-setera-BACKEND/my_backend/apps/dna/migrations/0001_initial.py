# Generated by Django 4.1.5 on 2023-02-08 07:35

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):
    initial = True

    dependencies = [
        ("mobile", "0001_initial"),
    ]

    operations = [
        migrations.CreateModel(
            name="serviceId",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                (
                    "subscriptionId",
                    models.CharField(max_length=256, verbose_name="Subscription id"),
                ),
                (
                    "cfssMobileVoice",
                    models.CharField(max_length=256, verbose_name="CFSS_MOBILE_VOICE"),
                ),
                ("cfssSms", models.CharField(max_length=256, verbose_name="CFSS_SMS")),
                ("cfssMms", models.CharField(max_length=256, verbose_name="CFSS_MMS")),
                (
                    "cfssSmsValueAddedServices",
                    models.CharField(
                        max_length=256, verbose_name="CFSS_SMS_VALUE_ADDED_SERVICES"
                    ),
                ),
                (
                    "cfssData",
                    models.CharField(max_length=256, verbose_name="CFSS_DATA"),
                ),
                (
                    "cfssRoaming",
                    models.CharField(max_length=256, verbose_name="CFSS_ROAMING"),
                ),
                (
                    "cfssDataRoamingLimit",
                    models.CharField(
                        max_length=256, verbose_name="CFSS_DATA_ROAMING_LIMIT"
                    ),
                ),
                ("active", models.BooleanField(default=True)),
                (
                    "subscription",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.PROTECT,
                        to="mobile.subscription",
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="provNotification",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                (
                    "time",
                    models.DateTimeField(
                        auto_now_add=True, verbose_name="Provisioning message save time"
                    ),
                ),
                (
                    "order_id",
                    models.CharField(
                        blank=True,
                        max_length=255,
                        verbose_name="Order id for the provisioning",
                    ),
                ),
                (
                    "message",
                    models.JSONField(null=True, verbose_name="Provisoning message"),
                ),
                (
                    "subscription",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.PROTECT,
                        to="mobile.subscription",
                    ),
                ),
            ],
        ),
    ]