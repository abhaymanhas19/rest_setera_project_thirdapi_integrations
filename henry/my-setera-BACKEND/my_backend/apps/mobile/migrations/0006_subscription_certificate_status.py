# Generated by Django 4.1 on 2023-08-11 04:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('mobile', '0005_catalogservices'),
    ]

    operations = [
        migrations.AddField(
            model_name='subscription',
            name='certificate_status',
            field=models.BooleanField(default=False, verbose_name='Certificate Status'),
        ),
    ]
