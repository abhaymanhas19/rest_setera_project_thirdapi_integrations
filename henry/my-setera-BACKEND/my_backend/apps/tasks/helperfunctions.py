from json import dumps, loads
from apps.mobile.models import *
from django.db.models import Q
from requests import post
from .models import Task
from apps.dna.models import serviceId
from datetime import datetime, timedelta

import pytz
from rest_framework import serializers
from django.core.serializers import serialize
import jwt
from celery import shared_task
from apps.users.models import SeteraUser
import requests


def createTask(
    payload: str, user, order_type: str, order_product: str, order_target: str
):
    """
    Create a task
    """
    task = Task()
    task.order_id = f'MOBILE_ORDER_{datetime.strftime(datetime.now(), "%Y%m%d%H%M%S")}'
    task.author = user
    task.order_product = order_product
    task.order_type = order_type
    task.order_target = order_target
    task.payload = payload
    task.completed = False
    task.save()


def doTask(querytask, order_id):
    task = Task.objects.get(order_id=order_id)
    if task.order_product == "mobile":
        if querytask == "start_mobile_provisioning":
            createOPR(task)
        elif querytask == "start_odoo_provisioning":
            createODOO(task)
        elif querytask == "start_goodsign_provisioning":
            createGS(task)
        elif querytask == "start_mex_provisioning":
            createMEX(task)
        elif querytask == "mark_task_done":
            task.completed = True
            task.save()
    else:
        pass


def createOPR(task):
    """OPR = operator provisioning request"""
    if task.payload["carrier"] == "2":
        createDnaOPR(task)


def createDnaOPR(task):
    if task.order_type == "new":
        dnaNewMobile(task)
    elif task.order_type == "terminate":
        dnaTerminateMobile(task)
    elif task.order_type == "newSim":
        dnaChangeSim(task)
    elif task.order_type == "addCertificate":
        dnaAddCertificate(task)
    elif task.order_type == "modify":
        barrings = {"cfs": []}
        needsToBeRemoved = []
        for change in task.payload["changes"]:
            if "barring_roamingdata" in change["name"]:
                dnaModifyRoamingLimit(task)
            elif (
                "barring_voice" in change["name"]
                or "barring_mms" in change["name"]
                or "barring_sms" in change["name"]
                or "barring_roaming" in change["name"]
                or "barring_data" in change["name"]
            ):
                if change["before"]:
                    print(task.payload["sub_id"])
                    print(change["before"])
                    oldServiceId = serviceId.objects.get(
                        subscription=task.payload["sub_id"],
                        active=True,
                        cfsId=change["before"],
                    )
                    barrings["cfs"].append(
                        {
                            "cfsId": change["before"],
                            "cfsAction": "REMOVE",
                            "serviceId": oldServiceId.serviceId,
                        }
                    )
                    needsToBeRemoved.append(oldServiceId)
                if change["after"]:
                    barrings["cfs"].append(
                        {"cfsId": change["after"], "cfsAction": "ADD"}
                    )
            elif change["name"] == "mobile_product":
                newProduct = mobileProduct.objects.get(pk=change["after"])
                changeMobileProduct(task, newProduct)
        if barrings["cfs"]:
            dnaBarrings(task, barrings, needsToBeRemoved)
    elif task.order_type == "remove":
        for change in task.payload["changes"]:
            if "CFSS_ROAMING_BARRING" in change["before"]:
                removeService(task)


def changeMobileProduct(task, newProduct):
    activationDate = datetime.strftime(
        datetime.now() + timedelta(minutes=5), "%Y-%m-%dT%H:%M:%S"
    )
    oldServId = serviceId.objects.get(
        subscription=task.payload["sub_id"], active=True, cfsId="CFSS_DATA"
    )
    postPayload = {
        "orderDate": datetime.strftime(task.created, "%Y-%m-%dT%H:%M:%S"),
        "subscription": task.order_target,
        "activationDate": activationDate,
        "subscriptionId": oldServId.subscriptionId,
        "serviceId": oldServId.serviceId,
        "dataCode": newProduct.datacode.name,
        "threeGDown": newProduct.dataspeed3GDown.name,
        "threeGUp": newProduct.dataspeed3GUp.name,
        "fourGDown": newProduct.dataspeed4GDown.name,
        "fourGUp": newProduct.dataspeed4GUp.name,
        "priority": newProduct.priority.name,
    }

    modifyOperatorStatus(task, "1")
    headers = {"content-type": "application/json"}
    dnaOrderId = post(
        "https://setera-api.setera.com/dnaApi/modifyData",
        json=postPayload,
        headers=headers,
    ).text
    saveDnaOrderId(task, dnaOrderId)


def dnaBarrings(task, barrings, needsToBeRemoved):
    activationDate = datetime.strftime(
        datetime.now() + timedelta(minutes=5), "%Y-%m-%dT%H:%M:%S"
    )
    subId = serviceId.objects.filter(
        subscription=task.payload["sub_id"], active=True
    ).first()

    postPayload = {
        "orderDate": datetime.strftime(task.created, "%Y-%m-%dT%H:%M:%S"),
        "subscription": task.order_target,
        "activationDate": activationDate,
        "subscriptionId": subId.subscriptionId,
        "numberType": "MOBILE",
        "services": barrings,
    }
    for row in needsToBeRemoved:
        row.active = "False"
        row.save()
    modifyOperatorStatus(task, "1")
    headers = {"content-type": "application/json"}
    dnaOrderId = post(
        "https://setera-api.setera.com/dnaApi/modifyServices",
        json=postPayload,
        headers=headers,
    ).text
    saveDnaOrderId(task, dnaOrderId)


def dnaModifyRoamingLimit(task):
    activationDate = datetime.strftime(
        datetime.now() + timedelta(minutes=5), "%Y-%m-%dT%H:%M:%S"
    )
    subId = serviceId.objects.filter(
        subscription=task.payload["sub_id"], active=True
    ).first()
    roamingServiceId = serviceId.objects.filter(
        subscription=task.payload["sub_id"],
        cfsId="CFSS_DATA_ROAMING_LIMIT",
        active=True,
    ).first()

    for change in task.payload["changes"]:
        newValue = change["after"]

    postPayload = {
        "orderDate": datetime.strftime(task.created, "%Y-%m-%dT%H:%M:%S"),
        "subscription": task.order_target,
        "activationDate": activationDate,
        "subscriptionId": subId.subscriptionId,
        "serviceId": roamingServiceId.serviceId,
        "dataRoamingLimit": newValue,
    }
    modifyOperatorStatus(task, "1")
    headers = {"content-type": "application/json"}
    dnaOrderId = post(
        "https://setera-api.setera.com/dnaApi/modifyRoamingLimit",
        json=postPayload,
        headers=headers,
    ).text
    saveDnaOrderId(task, dnaOrderId)


def removeService(task):
    activationDate = datetime.strftime(
        datetime.now() + timedelta(minutes=5), "%Y-%m-%dT%H:%M:%S"
    )
    subId = serviceId.objects.filter(
        subscription=task.payload["sub_id"], active=True
    ).first()

    for change in task.payload["changes"]:
        removeValue = change["before"]
    print(removeValue)

    removeService = serviceId.objects.filter(
        subscription=task.payload["sub_id"], cfsId=removeValue, active=True
    ).first()

    postPayload = {
        "orderDate": datetime.strftime(task.created, "%Y-%m-%dT%H:%M:%S"),
        "subscription": task.order_target,
        "activationDate": activationDate,
        "subscriptionId": subId.subscriptionId,
        "cfsId": removeService.cfsId,
        "serviceId": removeService.serviceId,
    }

    modifyOperatorStatus(task, "1")
    headers = {"content-type": "application/json"}
    dnaOrderId = post(
        "https://setera-api.setera.com/dnaApi/modifyRoamingLimit",
        json=postPayload,
        headers=headers,
    ).text
    saveDnaOrderId(task, dnaOrderId)


def dnaChangeSim(task):
    activationDate = datetime.strftime(
        datetime.now() + timedelta(minutes=5), "%Y-%m-%dT%H:%M:%S"
    )
    subId = serviceId.objects.filter(
        subscription=task.payload["sub_id"], active=True
    ).first()

    print(task)

    postPayload = {
        "orderDate": datetime.strftime(task.created, "%Y-%m-%dT%H:%M:%S"),
        "subscription": task.order_target,
        "activationDate": activationDate,
        "subscriptionId": subId.subscriptionId,
        "iccId": task.payload["new_sim_card"],
    }
    print(postPayload)
    headers = {"content-type": "application/json"}
    dnaOrderId = post(
        "https://setera-api.setera.com/dnaApi/modifySim",
        json=postPayload,
        headers=headers,
    ).text
    saveDnaOrderId(task, dnaOrderId)


def checkAndInsertDeleteServiceId(subscirptionId, servId):
    subId = serviceId.objects.get(subscriptionId=subscirptionId, serviceId=servId)
    if subId:
        subId.active = "False"
        subId.save()
        return True
    else:
        return False


def dnaTerminateMobile(task):
    input_timezone = pytz.timezone("Europe/Helsinki")
    activationDate = datetime.strftime(
        datetime.strptime(task.payload["terminate"], "%Y/%m/%d %H:%M"),
        "%Y-%m-%dT%H:%M:%S",
    )
    subId = serviceId.objects.filter(subscription=task.payload["sub_id"], active=True)
    simdata = SIM.objects.get(pk=task.payload["sim_id"])

    # Update subscription close date
    subData = Subscription.objects.get(pk=task.payload["sub_id"])
    subCloseDate = input_timezone.localize(
        datetime.strptime(task.payload["terminate"], "%Y/%m/%d %H:%M")
    )
    subData.subscription_close_date = subCloseDate
    subData.save()

    delSubId = subId.first().subscriptionId

    postPayload = {
        "orderDate": datetime.strftime(task.created, "%Y-%m-%dT%H:%M:%S"),
        "subscription": task.payload["sub_number"],
        "activationDate": activationDate,
        "subscriptionId": subId.first().subscriptionId,
        "imsi": simdata.imsi,
        "iccId": simdata.icc,
        "numberType": "MOBILE",
    }

    modifyOperatorStatus(task, "1")
    for s in subId:
        modifyDnaServiceIdStatus(s, "False")
    headers = {"content-type": "application/json"}
    dnaOrderId = post(
        "https://setera-api.setera.com/dnaApi/delete", json=postPayload, headers=headers
    ).text
    saveDnaOrderId(task, dnaOrderId)


def dnaAddCertificate(task):
    activationDate = datetime.strftime(
        datetime.now() + timedelta(minutes=5), "%Y-%m-%dT%H:%M:%S"
    )
    subId = serviceId.objects.filter(
        subscription=task.payload["sub_id"], active=True
    ).first()

    postPayload = {
        "orderDate": datetime.strftime(task.created, "%Y-%m-%dT%H:%M:%S"),
        "subscription": task.payload["sub_number"],
        "activationDate": activationDate,
        "subscriptionId": subId.subscriptionId,
    }

    modifyOperatorStatus(task, "1")
    headers = {"content-type": "application/json"}
    dnaOrderId = post(
        "https://setera-api.setera.com/dnaApi/addMobileCertificate",
        json=postPayload,
        headers=headers,
    ).text
    saveDnaOrderId(task, dnaOrderId)


def dnaNewMobile(task):
    simdata = SIM.objects.get(pk=task.payload["sim"])
    mobileproductid = mobileProduct.objects.get(pk=task.payload["mobile_product"])
    dataCode = mobileDataCode.objects.get(pk=mobileproductid.datacode.id)
    threeGDown = subscriptionDataSpeed.objects.get(
        pk=mobileproductid.dataspeed3GDown.id
    )
    threeGUp = subscriptionDataSpeed.objects.get(pk=mobileproductid.dataspeed3GUp.id)
    fourGDown = subscriptionDataSpeed.objects.get(pk=mobileproductid.dataspeed4GDown.id)
    fourGUp = subscriptionDataSpeed.objects.get(pk=mobileproductid.dataspeed4GUp.id)
    dataRoamingLimit = barringRoamingData.objects.get(
        pk=task.payload["barring_roamingdata"]
    )
    priority = mobilePriority.objects.get(pk=mobileproductid.priority.id)
    activationDate = datetime.strftime(
        datetime.strptime(task.payload["activation_date"], "%Y/%m/%d %H:%M"),
        "%Y-%m-%dT%H:%M:%S",
    )
    barring_voice = barringVoice.objects.get(pk=task.payload["barring_voice"])
    barring_sms = barringSMS.objects.get(pk=task.payload["barring_sms"])
    barring_mms = barringMMS.objects.get(pk=task.payload["barring_mms"])
    barring_data = barringData.objects.get(pk=task.payload["barring_data"])
    barring_roaming = barringRoaming.objects.get(pk=task.payload["barring_roaming"])

    postPayload = {
        "orderDate": datetime.strftime(task.created, "%Y-%m-%dT%H:%M:%S"),
        "subscription": task.payload["number"],
        "activationDate": activationDate,
        "imsi": simdata.imsi,
        "iccId": simdata.icc,
        "numberType": "MOBILE",
        "dataCode": dataCode.name,
        "threeGDown": threeGDown.name,
        "threeGUp": threeGUp.name,
        "fourGDown": fourGDown.name,
        "fourGUp": fourGUp.name,
        "dataRoamingLimit": dataRoamingLimit.operator_code,
        "priority": priority.name,
        "barrings": "",
    }
    cfs = []
    if task.payload["barring_voice"] != "1":
        cfs.append({"cfsId": barring_voice.operator_code, "cfsAction": "ADD"})
    if task.payload["barring_sms"] != "1":
        cfs.append({"cfsId": barring_sms.operator_code, "cfsAction": "ADD"})
    if task.payload["barring_mms"] != "1":
        cfs.append({"cfsId": barring_mms.operator_code, "cfsAction": "ADD"})
    if task.payload["barring_data"] != "1":
        cfs.append({"cfsId": barring_data.operator_code, "cfsAction": "ADD"})
    if task.payload["barring_roaming"] != "1":
        cfs.append({"cfsId": barring_roaming.operator_code, "cfsAction": "ADD"})
    if cfs:
        postPayload["barrings"] = {"cfs": cfs}

    modifyOperatorStatus(task, "1")
    headers = {"content-type": "application/json"}
    dnaOrderId = post(
        "https://setera-api.setera.com/dnaApi/create", json=postPayload, headers=headers
    ).text
    saveDnaOrderId(task, dnaOrderId)


def generate_barring_data(subscription):
    data = []
    for i in [
        subscription.barring_voice,
        subscription.barring_mms,
        subscription.barring_sms,
        subscription.barring_roaming,
        subscription.barring_data,
        subscription.barring_roamingdata,
        subscription.barring_international,
    ]:
        data.append({"cfsId": i.operator_code, "cfsAction": "ADD"})
    return data


def dnaSubscriptionCreate(subscription):
    postPayload = {
        "subscription": subscription.number,
        "dataProduct": {
            "dataCode": subscription.mobile_data.datacode.name,
            "threeGDown": subscription.mobile_data.dataspeed3GDown.name.name,
            "threeGUp": subscription.mobile_data.dataspeed3GUp.name,
            "fourGDown": subscription.mobile_data.dataspeed4GDown.name,
            "fourGUp": subscription.mobile_data.dataspeed4GUp.name,
            "priority": subscription.mobile_data.priority.name,
        },
        "dataRoamingLimit": "60",
        "barrings": generate_barring_data(),
        "imsi": subscription.sim.imsi,
        "iccId": subscription.sim.icc,
        "voicemail": subscription.voicemail_number,
    }

    headers = {"content-type": "application/json"}
    dnaOrderId = post(
        "https://setera-api.setera.com/dnaApi/v2/subscription/create",
        json=postPayload,
        headers=headers,
    ).text
    subscription.sent_to_dna = True
    subscription.save()


def modifyDnaServiceIdStatus(serviceId, newStatus):
    serviceId.active = newStatus
    serviceId.save()


def modifyOperatorStatus(task, newStatus):
    task.operator_provisioning_status = newStatus
    task.save()


def saveDnaOrderId(task, dnaOrderId):
    task.dna_order_id = dnaOrderId
    task.save()


def createODOO(task):
    modifyOdooStatus(task, "3")


def modifyOdooStatus(task, newStatus):
    task.odoo_provisioning_status = newStatus
    task.save()


def createGS(task):
    modifyGSStatus(task, "3")


def modifyGSStatus(task, newStatus):
    task.goodsign_provisioning_status = newStatus
    task.save()


def createMEX(task):
    modifyMEXStatus(task, "3")


def modifyMEXStatus(task, newStatus):
    task.mexmanager_provisioning_status = newStatus
    task.save()


def test(c):
    pass


def delete_subscription(instance, subscriptionId):
    print(f"create  subscription ")
    payload = {
        "number": instance.number,
        "subscriptionId": subscriptionId.subscriptionId,
        "imsi": instance.sim.imsi,
        "iccID": instance.sim.icc,
    }
    headers = {"content-type": "application/json"}
    delete_subscription = post(
        "https://setera-api.setera.com/dnaApi/v2/subscription/delete",
        json=payload,
        headers=headers,
    ).text

@shared_task
def tempclose(id):
    obj = Subscription.objects.filter(id=id).first()
    subscriptionid = serviceId.objects.filter(subscription=obj).first()
    payload = {
        "subscription": obj.number,
        "subscriptionId": subscriptionid.subscriptionId,
    }
    headers = {"content-type": "application/json"}
    temp_close = post(
        "https://setera-api.setera.com/dnaApi/v2/subscription/tempclose",
        json=payload,
        headers=headers,
    ).text


@shared_task
def tempopen(id):
    print("temp open")
    obj = Subscription.objects.filter(id=id).first()
    subscriptionid = serviceId.objects.filter(Subscription=obj).first()
    payload = {
        "subscription": obj.number,
        "subscriptionId": subscriptionid.subscriptionId,
        "serviceId": subscriptionid.serviceId,
    }
    headers = {"content-type": "application/json"}

    temp_open = post(
        "https://setera-api.setera.com/dnaApi/v2/subscription/tempopen",
        json=payload,
        headers=headers,
    ).text


def create_voicemail_number(subscription):
    print(f"create voicemail_number")
    subscriptionId = serviceId.objects.filter(subscription=subscription).first()
    payload = {
        "subscription": subscription.number,
        "subscriptionId": subscriptionId.subscriptionId,
        "voicemail": subscription.voicemail_number,
    }

    headers = {"content-type": "application/json"}
    voicemail_create = post(
        "https://setera-api.setera.com/dnaApi/v2/voicemail/create",
        json=payload,
        headers=headers,
    ).text



def modify_voicemail_number(subscription, service):
    print("modify voicemail_number")
    payload = {
        "subscription": subscription.number,
        "subscriptionId": service.subscriptionId,
        "voicemail": subscription.voicemail_number,
    }
    headers = {"content-type": "application/json"}


def delete_voicemail_number(subscription, service):
    print(f"delete voicemail_number")

    paylaod = {
        "subscription": subscription.number,
        "subscriptionId": service.subscriptionId,
        "cfsId": service.cfsId,
        "serviceId": service.serviceId,
    }
    headers = {"content-type": "application/json"}
    voicemail_delete = post(
        "https://setera-api.setera.com/dnaApi/v2/voicemail/delete",
        json=paylaod,
        headers=headers,
    ).text


def create_dataroaminglimit(service, subscription):
    data_roaming_payload = {
        "subscription": subscription.number,
        "subscriptionId": service.subscriptionId,
        "dataRoamingLimit": subscription.barring_data.operator_code,
    }

    headers = {"content-type": "application/json"}
    dataroaming_create = post(
        "https://setera-api.setera.com/dnaApi/v2/dataroaminglimit/create",
        json=data_roaming_payload,
        headers=headers,
    ).text


def delete_dataroaminglimit(service, subscription):
    print(f"delete dataroaminglimit ")
    paylaod = {
        "subscription": subscription.number,
        "subscriptionId": service.subscriptionId,
        "cfsId": service.cfsId,
        "serviceId": service.serviceId,
    }
    headers = {"content-type": "application/json"}

    dataroaming_delete = post(
        "https://setera-api.setera.com/dnaApi/v2/dataroaminglimit/delete",
        json=paylaod,
        headers=headers,
    ).text


def modify_dataroaminglimit(service, subscription):
    print(f"modify dataroaminglimit")
    data_roaming_payload = {
        "subscription": subscription.number,
        "subscriptionId": service.subscriptionId,
        "cfsId": service.cfsId,
        "serviceId": service.serviceId,
        "dataRoamingLimit": subscription.barring_data.operator_code,
    }
    headers = {"content-type": "application/json"}

    dataroming_modify = post(
        "https://setera-api.setera.com/dnaApi/v2/dataroaminglimit/modify",
        json=data_roaming_payload,
        headers=headers,
    ).text


def create_datapackage(subscription):
    print(f"create datapackage   {subscription.mobile_product.datacode.name,}")
    dataProduct = {
        "dataCode": subscription.mobile_product.datacode.name,
        "threeGDown": subscription.mobile_product.dataspeed3GUp.name,
        "threeGUp": subscription.mobile_product.dataspeed3GUp.name,
        "fourGDown": subscription.mobile_product.dataspeed4GDown.name,
        "fourGUp": subscription.mobile_product.dataspeed4GUp.name,
        "priority": subscription.mobile_product.priority.name,
    }

    subscriptionId = serviceId.objects.filter(subscription=subscription).first()

    datapackege_payload = {
        "subscription": subscription.number,
        "subscriptionId": subscriptionId.subscriptionId,
        "dataProduct": dataProduct,
    }
    headers = {"content-type": "application/json"}

    create_datapackage = post(
        "https://setera-api.setera.com/dnaApi/v2/datapackage/create",
        json=datapackege_payload,
        headers=headers,
    ).text


def modify_datapackage(subscription):
    print(f"Modify datapackage {subscription.mobile_product.datacode.name}")
    dataProduct = {
        "dataCode": subscription.mobile_product.datacode.name,
        "threeGDown": subscription.mobile_product.dataspeed3GUp.name,
        "threeGUp": subscription.mobile_product.dataspeed3GUp.name,
        "fourGDown": subscription.mobile_product.dataspeed4GDown.name,
        "fourGUp": subscription.mobile_product.dataspeed4GUp.name,
        "priority": subscription.mobile_product.priority.name,
    }

    subscriptionId = serviceId.objects.filter(subscription=subscription).first()

    # modify datapackege
    datapackege_payload = {
        "subscription": subscription.number,
        "subscriptionId": subscriptionId.subscriptionId,
        "serviceId": subscriptionId.serviceId,
        "dataProduct": dataProduct,
    }

    headers = {"content-type": "application/json"}

    modify_datapackage = requests.post(
        "https://setera-api.setera.com/dnaApi/v2/datapackage/modify",
        json=datapackege_payload,
        headers=headers,
    ).text



def delete_datapackage(subscription):
    print(f"delete datapackage")
    subscriptionId = serviceId.objects.filter(subscription=subscription).first()
    payload = {
        "subscription": subscription.number,
        "subscriptionId": subscriptionId.subscriptionId,
        "cfsId": subscriptionId.cfsId,
        "serviceId": subscriptionId.serviceId,
    }
    headers = {"content-type": "application/json"}

    delete_datapackage = post(
        "https://setera-api.setera.com/dnaApi/v2/datapackage/delete",
        json=payload,
        headers=headers,
    ).text


@shared_task
def modify_sim(id):
    subscription=Subscription.objects.filter(id=id).first()
    print(f"modify sim")
    subscriptionId = serviceId.objects.filter(subscription=subscription).first()
    payload = {
        "number": subscription.number,
        "subscriptionId": subscriptionId.subscriptionId,
        "imsi": subscription.sim.imsi,
        "iccId": subscription.sim.icc,
    }
    headers = {"content-type": "application/json"}


    sim_modify = post(
        "https://setera-api.setera.com/dnaApi/v2/sim/modify",
        json=payload,
        headers=headers,
    ).text
