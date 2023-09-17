from django.shortcuts import render
from apps.utils.orgmixin import orginizationModelMixin

# Create your views here.
from django.shortcuts import render, HttpResponse


# Create your views here.
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializer import *
from .models import *
from rest_framework import status
from apps.mobile.models import Subscription
from rest_framework.generics import ListCreateAPIView

# Create your views here.
from apps.users.haspermission import GroupPermission


class provNotificationAPI(ListCreateAPIView):

    required_permissions= ["Can view prov notification","Can add prov notification","Can chnage prov notification","Can delete prov notification"]
    permission_classes = [GroupPermission]
    serializer_class = provNotificationSerializer
    filterset_fields = ["id", "subscription__id", "order_id", "subscription__name"]
    ordering_fields = ["id", "subscription__id", "order_id", "subscription__name"]
    search_fields = ["id", "subscription__id", "order_id", "subscription__name"]

    def post(self, request, *args, **kwargs):
        serializer = provNotificationSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            data = serializer.validated_data["data"]
            subscription_id = data["soapenv:Envelope"]["soapenv:Body"][
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
            number = Subscription.objects.filter(
                number__icontains=subscription_id
            ).first()
            obj, _ = provNotification.objects.get_or_create(
                subscription_id=number.id, order_id=orderId, message=data
            )
        return Response(
            status=status.HTTP_201_CREATED,
        )

    def get_serializer(self, *args, **kwargs):
        if self.request.method in ["POST", "PUP", "PATCH", "DELETE"]:
            serializer_class = self.get_serializer_class()

        else:
            serializer_class = provNotificationSerializerResponse

        kwargs.setdefault("context", self.get_serializer_context())
        return serializer_class(*args, **kwargs)

    def get_queryset(self):
        user_org = self.request.user.organization
        return provNotification.objects.filter(subscription__organization=user_org.id)


class serviceIdAPI(ListCreateAPIView):

    required_permissions= ["Can view service id","Can add service id","Can chnage service id","Can delete service id"]
    permission_classes = [GroupPermission]
    serializer_class = serviceIdAPISerializer
    filterset_fields = fields = [
        "id",
        "subscription__id",
        "subscriptionId",
        "subscription__name",
        "cfsId",
        "serviceId",
        "active",
    ]

    search_fields = [
        "id",
        "subscription__id",
        "subscriptionId",
        "subscription__name",
        "cfsId",
        "serviceId",
        "active",
    ]
    ordering_fields = [
        "id",
        "subscription__id",
        "subscriptionId",
        "subscription__name",
        "cfsId",
        "serviceId",
        "active",
    ]

    def post(self, request, *args, **kwargs):
        serializer = serviceIdAPISerializer(data=request.data)

        if serializer.is_valid(raise_exception=True):
            data = serializer.validated_data["data"]

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

            number = Subscription.objects.filter(
                number__icontains=subscription_id
            ).first()
            obj, _ = serviceId.objects.get_or_create(
                subscription_id=number.id,
                subscriptionId=subscription_id,
                cfsId=cfsid,
                serviceId=service_id,
            )
            # print(obj)
        return Response(
            status=status.HTTP_201_CREATED,
        )

    def get_serializer(self, *args, **kwargs):
        if self.request.method in ["POST", "PUP", "PATCH", "DELETE"]:
            serializer_class = self.get_serializer_class()

        else:
            serializer_class = serviceIdAPISerializerResponse

        kwargs.setdefault("context", self.get_serializer_context())
        return serializer_class(*args, **kwargs)

    def get_queryset(self):
        user_org = self.request.user.organization
        return serviceId.objects.filter(subscription__organization=user_org.id)


