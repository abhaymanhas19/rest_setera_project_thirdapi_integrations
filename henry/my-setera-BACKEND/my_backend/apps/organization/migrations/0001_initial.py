# Generated by Django 4.1.5 on 2023-02-08 07:35

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):
    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="Customer",
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
                ("name", models.CharField(max_length=255, unique=True)),
                ("information", models.TextField(blank=True)),
                (
                    "agent",
                    models.ForeignKey(
                        blank=True,
                        null=True,
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="Agent",
                        to="organization.customer",
                    ),
                ),
                (
                    "reseller",
                    models.ForeignKey(
                        blank=True,
                        default="1",
                        null=True,
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="Reseller",
                        to="organization.customer",
                    ),
                ),
            ],
        ),
    ]
