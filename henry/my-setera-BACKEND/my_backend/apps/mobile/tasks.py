from datetime import datetime, timedelta
from my_backend.settings.base import *
from my_backend.settings.production import *
from my_backend.settings.development import *
from apps.tasks.helperfunctions import dnaSubscriptionCreate
from my_backend.celery import *
from .models import *
from django.conf import settings
import requests
from rest_framework.response import Response
from rest_framework import status


@app.task(name="ExpirePlan")
def ExpirePlan():
    try:
        time = datetime.now()
        print("checking for subscriptions to set inactive.")
        expire_obj = Subscription.objects.filter(
            subscription_close_date__lte=time, active=True
        ).update(active=False)
        print("expire_obj", expire_obj)

        # expire_obj = Subscription.objects.filter(active = False)
        # for i in expire_obj:
        #     try:
        #         i.active = True
        #         i.save()
        #     except Exception as e:
        #         print("this is e", e)
    except Exception as e:
        print(e)


@app.task(name="SendSubscriptionToDna")
def send_subscription():
    try:
        time = datetime.now()
        print("checking for subscriptions to set inactive.")
        subscriptions = Subscription.objects.filter(
            subscription_open_date__lte=time, sent_to_dna=False
        )
        for i in subscriptions:
            dnaSubscriptionCreate(i)
    except Exception as e:
        print(e)





@app.task(name="sync_oraganizationdata")
def sync_oraganizationdata():
    print("customers sync is running")
    try:
        if not settings.DEBUG:
            response = requests.get("https://setera-api.setera.com/odooApi/customers")
            org_data = response.json()
            for org_info in org_data:
                odoo_org_identifier = org_info.get("odoo_org_identifier")
                org_name = org_info.get("name")
                if not org_name:
                    return Response(
                        {"message": "Organization name not found"},
                        status=status.HTTP_400_BAD_REQUEST,
                    )
                if odoo_org_identifier:
                    try:
                        organization, create = Organization.objects.get_or_create(
                            name=org_info.get("name"),
                            is_sale_agent=org_info.get("is_sale_agent"),
                            is_sale_agent_organization=org_info.get(
                                "is_sale_agent_organization"
                            ),
                            agent=org_info.get("agent"),
                            is_sale_reseller=org_info.get("is_sale_reseller"),
                            is_sale_reseller_customer=org_info.get(
                                "is_sale_reseller_customer"
                            ),
                            reseller=org_info.get("reseller"),
                            goodsign_org_identifier=org_info.get(
                                "goodsign_org_identifier"
                            ),
                            odoo_org_identifier=odoo_org_identifier,
                            information=org_info.get("information"),
                        )
                    except Exception as e:
                        return Response(status=status.HTTP_400_BAD_REQUEST)

    except Exception as e:
        return Response(status=status.HTTP_400_BAD_REQUEST)
