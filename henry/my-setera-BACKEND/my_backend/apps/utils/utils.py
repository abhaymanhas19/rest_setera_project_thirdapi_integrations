from rest_framework import serializers
from apps.tasks.helperfunctions import *
from celery import shared_task
from my_backend.celery import *
from apps.dna.models import *
from django.conf import settings
from celery import current_app
from my_backend.settings import j_key
import requests
from django.conf import settings
import random
from django.core.cache import caches


def create_task_payload(before, after):
    output = []
    for i in before.keys():
        output.append({"name": i, "before": before[i], "after": after[i]})
    return output


# subscription active or not
def objupdate(obj):
    if obj.active is False:
        raise serializers.ValidationError("The subscription is not active.")


@shared_task
def modify_subsctiption(old_data, subscriptionId):
    try:
        subscription = Subscription.objects.get(id=subscriptionId)
        service = serviceId.objects.filter(subscription=subscription).first()
        if not service and subscription.active:
            return False
        sim_info = next(filter(lambda x: x["name"] == "sim", old_data), None)
        voice_mail_info = next(
            filter(lambda x: x["name"] == "voicemail_number", old_data), None
        )
        barring_roamingdata_info = next(
            filter(lambda x: x["name"] == "barring_roamingdata", old_data), None
        )
        mobile_product_info = next(
            filter(lambda x: x["name"] == "mobile_product", old_data), None
        )
    
        # if sim_info["before"] != sim_info["after"]:
        #     modify_sim(subscription)

        if not voice_mail_info["before"] and voice_mail_info["after"]:
            create_voicemail_number(subscription)
        elif (
            voice_mail_info["before"]
            and voice_mail_info["after"]
            and voice_mail_info["before"] != voice_mail_info["after"]
        ):
            modify_voicemail_number(subscription, service)

        elif voice_mail_info["before"] and not voice_mail_info["after"]:
            delete_voicemail_number(subscription, service)

        # if not barring_roamingdata_info["before"] and barring_roamingdata_info["after"]:
        #     create_dataroaminglimit(service, subscription)
        # elif (
        #     barring_roamingdata_info["before"]
        #     and barring_roamingdata_info["after"]
        #     and barring_roamingdata_info["before"] != barring_roamingdata_info["after"]
        # ):
        #     modify_dataroaminglimit(service, subscription)
        # elif (
        #     barring_roamingdata_info["before"] and not barring_roamingdata_info["after"]
        # ):
        #     delete_dataroaminglimit(service, subscription)

        # if not mobile_product_info["before"] and mobile_product_info["after"]:
        #     create_datapackage(subscription)
        # elif (
        #     mobile_product_info["before"]
        #     and mobile_product_info["after"]
        #     and mobile_product_info["before"] != mobile_product_info["after"]
        # ):
        #     modify_datapackage(subscription)

        # elif mobile_product_info["before"] and not mobile_product_info["after"]:
        #     delete_datapackage(subscription)

    except Exception as e:
        current_app.control.revoke(modify_subsctiption.request.id, terminate=True)
        raise e


@shared_task
def callbarring_roamingdata(barring_roamingdata_id_before,barring_roamingdata_id_after,id):
    print(id)
    subscription = Subscription.objects.get(id=id)
    service = serviceId.objects.filter(subscription=subscription).first()
    try:
        if not barring_roamingdata_id_before  and barring_roamingdata_id_after:
            create_dataroaminglimit(service, subscription)

        elif (barring_roamingdata_id_before and barring_roamingdata_id_after  and barring_roamingdata_id_before != barring_roamingdata_id_after ):
            modify_dataroaminglimit(service, subscription)
        
        elif barring_roamingdata_id_before and not barring_roamingdata_id_after:
            delete_dataroaminglimit(service, subscription)
    except Exception as e:
        current_app.control.revoke(modify_subsctiption.request.id, terminate=True)
        raise e

@shared_task
def callmobile_product(mobile_product_id_before,mobile_product_id_after,id):
    subscription=Subscription.objects.filter(id=id).first()

    try:
        if not mobile_product_id_before  and mobile_product_id_after:
            create_datapackage(subscription)
        elif (mobile_product_id_before and mobile_product_id_after  and mobile_product_id_before != mobile_product_id_after ):
            modify_datapackage(subscription)
        elif mobile_product_id_before and not mobile_product_id_after:
            delete_datapackage(subscription)

    except Exception as e:
        current_app.control.revoke(modify_subsctiption.request.id, terminate=True)
        raise e
            




@shared_task
def SendMObileOTP(mobile, otp):
    seterasms_url = "https://setera-api.setera.com/smsApi/send"
    payload = {
        "sender": "Setera",
        "to": mobile,
        "payload": f"Your one time password is {otp}",
    }
    response = requests.post(seterasms_url, json=payload)
    if response.status_code == 200:
        return True
    error_message = "Failed to send OTP. Please try again later."
    raise Exception(error_message)


def send_login_otp(auth_token):
    decoded_token = jwt.decode(auth_token, j_key, algorithms=["HS256"])
    email = decoded_token["email"]
    otp = decoded_token.get("otp")  # Retrieve the OTP, returns None if it doesn't exist
    if not otp:
        otp = random.randint(1000, 9999)
    print(f"your one time password is ---{otp}")
    user = SeteraUser.objects.filter(email=email).first()
    if settings.ENVIRONMENT in ["stage", "production"]:
        SendMObileOTP.apply_async(args=[user.mobile, otp])

    cache_key = auth_token
    cache = caches["default"]
    cache.set(cache_key, otp)



def userpermisson(request):
    user_groups = request.user.groups.all()
    for group in user_groups:
            return group
            # group_permissions = group.permissions.filter(name= "Can view salesorder").exists()
            # if not group_permissions:
            #     return False   

      


  
    


