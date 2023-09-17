from apps.users.models import *
from apps.organization.models import *
from rest_framework import serializers
from django.utils.translation import gettext_lazy as _
from .models import *
from apps.organization.serializer import *


class CarrierSerializer(serializers.ModelSerializer):
    class Meta:
        model = Carrier
        fields = [
            "id",
            "name",
        ]


class subscriptionDataSpeedSerializer(serializers.ModelSerializer):
    class Meta:
        model = subscriptionDataSpeed
        fields = ("id", "name", "carrier", "value")


class subscriptionVoicePackageSerializer(serializers.ModelSerializer):
    class Meta:
        model = subscriptionVoicePackage
        fields = ("id", "name", "carrier", "value")


class CatalogServicesSerializer(serializers.ModelSerializer):
    sub_id = serializers.PrimaryKeyRelatedField(queryset=Subscription.objects.all(), allow_null=True, required=False)
    class Meta:
        model = catalogServices
        fields = [
            "id",
            "sub_id",
            "first_name",
            "last_name",
            "street_address",
            "city",
            "postal_code",
        ]
        # read_only_fields=('sub_id',)

class SubscriptionSerializer(serializers.ModelSerializer):
  

    class Meta:
        model = Subscription
        fields = (
            "id",
            "organization",
            "number",
            "sim",
            "carrier",
            "name",
            "mobile_product",
            "voicemail_number",
            "last_modified",
            "created",
            "subscription_open_date",
            "subscription_close_date",
            "catalog_status",
            "barring_voice",
            "barring_mms",
            "barring_sms",
            "barring_roaming",
            "barring_data",
            "barring_roamingdata",
            "temp_close",
            "barring_international",
            "active",
            "certificate_status"
           
        )
    

class TempcloseSubscriptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subscription
        fields = (
            "id",
            "temp_close",
           
        )
    

class Barring_roamingdataSubscriptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subscription
        fields = (
            "id",
            "barring_roamingdata",
        )

class Mobile_productSubscriptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subscription
        fields = (
            "id",
            "mobile_product",
        )


class SimUpdateSubscriptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subscription
        fields = (
            "id",
            "sim",
        )

class EndsubscriptionSubscriptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subscription
        fields = (
            "id",
            "active",)

#sim start 
class SIMSeriliazer(serializers.ModelSerializer):
    class Meta:
        model = SIM
        fields = (
            "id",
            "icc",
            "imsi",
            "puk1",
            "puk2",
            "acc",
            "tick",
            "sim_type",
            "last_modified",
            "created",
            "organization",
            "available",
        )





class BarringMMSSerializer(serializers.ModelSerializer):
    class Meta:
        model = barringMMS
        fields = ("id", "operator_code", "code", "name", "carrier")


class BarringVoiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = barringVoice
        fields = ("id", "operator_code", "code", "name", "carrier")


class BarringSMSSerializer(serializers.ModelSerializer):
    class Meta:
        model = barringSMS
        fields = ("id", "operator_code", "code", "name", "carrier")


class BarringRoamingSerializer(serializers.ModelSerializer):
    class Meta:
        model = barringRoaming
        fields = ("id", "operator_code", "code", "name", "carrier")


class BarringDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = barringData
        fields = ("id", "operator_code", "code", "name", "carrier")


class BarringRoamingDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = barringRoamingData
        fields = ("id", "operator_code", "code", "name", "carrier")


class mobileDataCodeSerializer(serializers.ModelSerializer):
    class Meta:
        model = mobileDataCode
        fields = ["id", "name"]


class mobilePrioritySerializer(serializers.ModelSerializer):
    class Meta:
        model = mobilePriority
        fields = ["id", "name"]


class MobileproductSerializer(serializers.ModelSerializer):
    class Meta:
        model = mobileProduct
        fields = (
            "id",
            "name",
            "carrier",
            "datacode",
            "dataspeed3GDown",
            "dataspeed3GUp",
            "dataspeed4GDown",
            "dataspeed4GUp",
            "voicepackage",
            "priority",
        )


class MobileResponseSerializer(serializers.ModelSerializer):
    carrier = CarrierSerializer()
    datacode = mobileDataCodeSerializer()
    dataspeed3GDown = subscriptionDataSpeedSerializer()
    dataspeed3GUp = subscriptionDataSpeedSerializer()
    dataspeed4GDown = subscriptionDataSpeedSerializer()
    dataspeed4GUp = subscriptionDataSpeedSerializer()
    voicepackage = subscriptionVoicePackageSerializer()
    priority = mobilePrioritySerializer()

    class Meta:
        model = mobileProduct
        fields = [
            "id",
            "name",
            "carrier",
            "datacode",
            "dataspeed3GDown",
            "dataspeed3GUp",
            "dataspeed4GDown",
            "dataspeed4GUp",
            "voicepackage",
            "priority",
        ]

class SubscriptionResponseSerializer(serializers.ModelSerializer):
    organization = OrgSerializer()
    sim = SIMSeriliazer()
    carrier = CarrierSerializer()
    mobile_product = MobileproductSerializer()
    barring_voice = BarringVoiceSerializer()
    barring_mms = BarringMMSSerializer()
    barring_sms = BarringSMSSerializer()
    barring_roaming = BarringRoamingSerializer()
    barring_data = BarringDataSerializer()
    barring_roamingdata = BarringRoamingDataSerializer()
    catelog=serializers.SerializerMethodField()

    def get_catelog(self, instance):
        obj = catalogServices.objects.filter(sub_id = instance).first()
        serializer = CatalogServicesSerializer(obj)
        return serializer.data

    class Meta:
        model = Subscription
        fields = (
            "id",
            "organization",
            "number",
            "sim",
            "carrier",
            "name",
            "mobile_product",
            "voicemail_number",
            "last_modified",    
            "created",
            "subscription_open_date",
            "subscription_close_date",
            "active",
            "catalog_status",
            "barring_voice",
            "barring_mms",
            "barring_sms",
            "barring_roaming",
            "barring_data",
            "barring_roamingdata",
            "temp_close",
            "barring_international",
            "catelog",
            "certificate_status",
        )

        read_only_fields = ("temp_close",)



class Barring_roamingdataResponseSubscriptionSerializer(serializers.ModelSerializer):
    barring_roamingdata = BarringRoamingDataSerializer()
    
    class Meta:
        model = Subscription
        fields = (
            "id",
            "barring_roamingdata",
        )
    
class Mobile_productResponseSubscriptionSerializer(serializers.ModelSerializer):
    mobile_product = MobileproductSerializer()
    class Meta:
        model = Subscription
        fields = (
            "id",
            "mobile_product",
        )




class SimResponseSubscriptionSerializer(serializers.ModelSerializer):
    sim = SIMSeriliazer()
    class Meta:
        model = Subscription
        fields = (
            "id",
            "sim",
        )







class ChangemobileserviceSerializer(serializers.Serializer):
    pass


class SubAPIResponseAPI(serializers.ModelSerializer):
    class Meta:
        model = Subscription
        fields = ["id", "mobile_product", "barring_roamingdata"]



