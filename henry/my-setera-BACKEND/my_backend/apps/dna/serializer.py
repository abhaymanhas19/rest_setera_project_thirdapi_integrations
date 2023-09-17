from apps.users.models import *
from apps.organization.models import *
from rest_framework import serializers
from django.core.exceptions import ValidationError
from .models import *


class provNotificationSerializer(serializers.Serializer):
    def validate(self, attr):
        data = attr.get("data")
        try:
            sub_id = data["soapenv:Envelope"]["soapenv:Body"][
                "ServiceOrders.notifySetera:statusNotification"
            ]["ServiceOrders.notifySetera:statusNotificationType"][
                "Setera.Provisioning.Dna:LineOfServices"
            ][
                "Setera.Provisioning.Dna:LineOfService"
            ][
                "Setera.Provisioning.Dna:subscriptionID"
            ]
            orderId = data["soapenv:Envelope"]["soapenv:Body"][
                "ServiceOrders.notifySetera:statusNotification"
            ]["ServiceOrders.notifySetera:statusNotificationType"][
                "Setera.Provisioning.Dna:orderId"
            ]
        except Exception as e:
            raise ValidationError(str(e))
        return attr


class provNotificationSerializerResponse(serializers.ModelSerializer):
    class Meta:
        model = provNotification
        fields = ("id", "subscription", "time", "order_id", "message")


class serviceIdAPISerializer(serializers.Serializer):
    data = serializers.JSONField()

    def validate(self, attr):
        data = attr.get("data")
        try:
            subscription_id = data["Setera.Provisioning.Dna:LineOfServices"][
                "Setera.Provisioning.Dna:LineOfService"
            ]["Setera.Provisioning.Dna:subscriptionID"]
            cfsid = data["Setera.Provisioning.Dna:LineOfServices"][
                "Setera.Provisioning.Dna:LineOfService"
            ]["Setera.Provisioning.Dna:cfsServiceInstances"][
                "Setera.Provisioning.Dna:cfsService"
            ][
                "Setera.Provisioning.Dna:cfsId"
            ]
            service_id = data["Setera.Provisioning.Dna:LineOfServices"][
                "Setera.Provisioning.Dna:LineOfService"
            ]["Setera.Provisioning.Dna:cfsServiceInstances"][
                "Setera.Provisioning.Dna:cfsService"
            ][
                "Setera.Provisioning.Dna:serviceId"
            ]

        except Exception as e:
            raise ValidationError(str(e))
        return attr


class serviceIdAPISerializerResponse(serializers.ModelSerializer):
    class Meta:
        model = serviceId
        fields = (
            "id",
            "subscription",
            "subscriptionId",
            "cfsId",
            "serviceId",
            "active",
        )
