from django.shortcuts import render

# Create your views here.
from django.shortcuts import render, HttpResponse

# Create your views here.
from rest_framework.decorators import api_view
from rest_framework.response import Response

from rest_framework import generics
from apps.organization.models import *
from apps.users.models import *
from rest_framework.permissions import AllowAny, IsAuthenticated

from apps.utils.orgmixin import orginizationModelMixin
from .serializer import *
from .models import *
from rest_framework import viewsets
from rest_framework import status
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404
from apps.tasks.helperfunctions import *
import json
from apps.utils.utils import *
from apps.dna.models import serviceId
from django.forms.models import model_to_dict
from apps.utils.utils import callmobile_product , callbarring_roamingdata

from apps.users.haspermission import GroupPermission
from django.http import JsonResponse


def sub(request):
    return HttpResponse("Done")


class SIMApiView(orginizationModelMixin, viewsets.ModelViewSet):
    required_permissions= ["Can view sim","Can add sim","Can chnage sim","Can delete sim"]
    permission_classes = [GroupPermission]
    queryset = SIM.objects.all()
    serializer_class = SIMSeriliazer
    search_fields = [
        "icc",
        "imsi",
        "puk1",
        "puk2",
        "acc",
        "tick",
        "sim_type",
        "organization__name",
    ]

    def get_queryset(self):
        return self.queryset.filter(organization=self.request.headers["Organization"])


class SubscriptionApiView(orginizationModelMixin, viewsets.ModelViewSet):

    required_permissions= ["Can view subscription","Can add subscription","Can chnage subscription","Can delete subscription"]
    permission_classes = [GroupPermission]

    queryset = Subscription.objects.all()
    serializer_class = SubscriptionSerializer
    filterset_fields = [
        "name",
    ]
    search_fields = [
        "number",
        "name",
        "voicemail_number",
        "organization__name",
        "carrier__name",
        "active",
        "sim__icc",
        "sim__imsi",
        "sim__puk1",
        "sim__puk2",
        "sim__sim_type",
        "mobile_product__name",
    ]

    def perform_create(self, serializer):
        obj = serializer.save()
    
        if not obj.barring_roamingdata:
            try:
                obj.barring_roamingdata_id = 1
                obj.save()

            except Exception as e:
                print(e)

    def get_queryset(self):
        return (
            super()
            .get_queryset()
            .filter(organization=self.request.headers["organization"],is_deleted=False)
        )

    def get_serializer(self, *args, **kwargs):
        if self.request.method in ["POST", "PATCH", "PUT"]:
            serializer_class = self.get_serializer_class()
        else:
            serializer_class = SubscriptionResponseSerializer
        kwargs.setdefault("context", self.get_serializer_context())
        return serializer_class(*args, **kwargs)

    def update(self, request, *args, **kwargs):
        user = self.request.user
        partial = kwargs.pop("partial", False)
        instance = self.get_object()
        befor_save_data = Subscription.objects.filter(id=int(self.kwargs["pk"])).first()
        befor_save_data = dict(SubscriptionSerializer(instance=befor_save_data).data)
        serializer = SubscriptionSerializer(
            instance, data=request.data, partial=partial
        )
        serializer.is_valid(raise_exception=True)
        obj = self.perform_update(serializer)
        user_name = serializer.save()

        after_save_data = dict(serializer.data)
        mobile = serializer.data["number"]
        user = SeteraUser.objects.filter(first_name=user_name.organization).first()
        newdatapayload = create_task_payload(befor_save_data, after_save_data)
        createTask(json.dumps(newdatapayload), user, "Modify", "mobile", mobile)
        modify_subsctiption.apply_async(args=[newdatapayload, instance.id])

        return Response(serializer.data)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.is_deleted = True  # if true mean we delete that subscription
        instance.save()
        subscriptionId = serviceId.objects.filter(subscription=instance).first()
        # subscription_delete
        if instance.is_deleted is True:
            delete_subscription(instance, subscriptionId)

        return Response(status=status.HTTP_204_NO_CONTENT)

class BarringroamingdataUpdateApiView(generics.RetrieveUpdateAPIView):

    required_permissions= ["Can view carrier",'"Can add carrier"',"Can chnage carrier",'"Can delete carrier"']
    queryset = Subscription.objects.all()  # Replace with your queryset
    serializer_class = Barring_roamingdataSubscriptionSerializer
    lookup_field = "id"
    def get_serializer(self, *args, **kwargs):
        if self.request.method in ["POST", "PATCH", "PUT"]:
            serializer_class = self.get_serializer_class()
        else:
            serializer_class = Barring_roamingdataResponseSubscriptionSerializer
        kwargs.setdefault("context", self.get_serializer_context())
        return serializer_class(*args, **kwargs)
    
    def patch(self, request, *args, **kwargs):
        instance = self.get_object()
        if instance.barring_roamingdata is not None:
            barring_roamingdata_id_before = instance.barring_roamingdata.id  # Store the initial value
        else:
            barring_roamingdata_id_before = None

        response = self.partial_update(request, *args, **kwargs)

        instance = self.get_object()
        if instance.barring_roamingdata is not None:
            barring_roamingdata_id_after = instance.barring_roamingdata.id  # Get the updated value
        else:
            barring_roamingdata_id_after = None
        callbarring_roamingdata.apply_async(args=[barring_roamingdata_id_before,barring_roamingdata_id_after,instance.id])
        return response
        

class Mobile_productUpdateApiView(generics.RetrieveUpdateAPIView):
    required_permissions= ["Can view  mobile product","Can chnage  mobile product",]
    permission_classes = [GroupPermission]
    queryset = Subscription.objects.all()  # Replace with your queryset
    serializer_class = Mobile_productSubscriptionSerializer 
    lookup_field = "id"
    def get_serializer(self, *args, **kwargs):
        if self.request.method in ["POST", "PATCH", "PUT"]:
            serializer_class = self.get_serializer_class()
        else:
            serializer_class = Mobile_productResponseSubscriptionSerializer
        kwargs.setdefault("context", self.get_serializer_context())
        return serializer_class(*args, **kwargs)

    def patch(self, request, *args, **kwargs):
        instance = self.get_object()
        if instance.mobile_product is not None:
         mobile_product_id_before = instance.mobile_product.id  # Store the initial value
        else:
            mobile_product_id_before = None
        response = self.partial_update(request, *args, **kwargs)
        
        # Retrieve the updated instance
        instance = self.get_object()
        if instance.mobile_product is not None:
            mobile_product_id_after = instance.mobile_product.id  # Get the updated value
        else:
            mobile_product_id_after = None
        # callmobile_product(mobile_product_id_before,mobile_product_id_after,instance.id)
        callmobile_product.apply_async(args=[mobile_product_id_before,mobile_product_id_after,instance.id])
        return response
        


class  SubscriptionSIMUpdateAPI(generics.RetrieveUpdateAPIView):

    required_permissions= ["Can view sim","Can chnage sim",]
    permission_classes = [GroupPermission]
    
    queryset = Subscription.objects.all()  # Replace with your queryset
    serializer_class = SimUpdateSubscriptionSerializer 
    lookup_field = "id"

    def get_serializer(self, *args, **kwargs):
        if self.request.method in ["POST", "PATCH", "PUT"]:
            serializer_class = self.get_serializer_class()
        else:
            serializer_class = SimResponseSubscriptionSerializer
        kwargs.setdefault("context", self.get_serializer_context())
        return serializer_class(*args, **kwargs)
    
    def patch(self, request, *args, **kwargs):
        instance = self.get_object()
        sim_id_before = instance.sim.id
        response = self.partial_update(request, *args, **kwargs)
        instance = self.get_object()
        sim_id_after = instance.sim.id
        if sim_id_before != sim_id_after:
            modify_sim.apply_async(args=[instance.id])
    
        return response
    
class TemporarilyClosedApiView(generics.RetrieveUpdateAPIView):

    required_permissions= ["Can view carrier",'"Can add carrier"',"Can chnage carrier",'"Can delete carrier"']
    queryset = Subscription.objects.all()  # Replace with your queryset
    serializer_class = TempcloseSubscriptionSerializer 
    lookup_field = "id"
    def patch(self, request, *args, **kwargs):
        response = self.partial_update(request, *args, **kwargs)
        instance = self.get_object()
        subscription=Subscription.objects.filter(id=instance.id).first()
        if subscription.temp_close == False:
            tempclose.apply_async(args=[instance.id])
    
        return response

class TemporarilyopenApiView(generics.RetrieveUpdateAPIView):

    required_permissions= ["Can view carrier",'"Can add carrier"',"Can chnage carrier",'"Can delete carrier"']
    queryset = Subscription.objects.all()  # Replace with your queryset
    serializer_class = TempcloseSubscriptionSerializer 
    lookup_field = "id"
    def patch(self, request, *args, **kwargs):
        response = self.partial_update(request, *args, **kwargs)
        instance = self.get_object()
        subscription=Subscription.objects.filter(id=instance.id).first()
        if subscription.temp_close == True:
            tempclose.apply_async(args=[instance.id])
        return response
    
    
class Endsubscription(generics.RetrieveUpdateAPIView):

    required_permissions= ["Can view carrier",'"Can add carrier"',"Can chnage carrier",'"Can delete carrier"']
    queryset = Subscription.objects.all()  # Replace with your queryset
    serializer_class = EndsubscriptionSubscriptionSerializer 
    lookup_field = "id"
    
    def patch(self, request, *args, **kwargs):
        subscription_id = kwargs["id"]  # Get the subscription ID from URL parameters
       
        return self.partial_update(request, *args, **kwargs)
    



class catelogcreateServicesApiView(generics.CreateAPIView):
    
    required_permissions= ["Can view catalog services","Can add catalog services","Can chnage catalog services","Can delete catalog services"]
    permission_classes = [GroupPermission]
    queryset = catalogServices.objects.all()
    serializer_class = CatalogServicesSerializer
    filterset_fields = ["first_name"]



class catelogServicesUpdateApiView(generics.RetrieveUpdateDestroyAPIView):
    required_permissions= ["Can chnage catalog services","Can delete catalog services"]
    permission_classes = [GroupPermission]
    queryset = catalogServices.objects.all()
    serializer_class = CatalogServicesSerializer
    filterset_fields = ["first_name"]
    lookup_field ="pk"




class CarrierApiView(viewsets.ModelViewSet):
    required_permissions= ["Can view carrier",'"Can add carrier"',"Can chnage carrier",'"Can delete carrier"']
    permission_classes = [GroupPermission]
    queryset = Carrier.objects.all()
    serializer_class = CarrierSerializer
    filterset_fields = [
        "name",
    ]

class BarringMMSApiView(viewsets.ModelViewSet):

    required_permissions= ["Can view barring mms","Can add barring mms","Can chnage barring mms","Can delete barring mms"]
    permission_classes = [GroupPermission]
    queryset = barringMMS.objects.all()
    serializer_class = BarringMMSSerializer
    search_fields = ["operator_code", "code", "name", "carrier__name"]
    filterset_fields = ["operator_code", "code", "name", "carrier__id", "carrier__name"]


class BarringVoiceApiView(viewsets.ModelViewSet):

    required_permissions= ["Can view barring voice","Can add barring voice","Can chnage barring voice","Can delete barring voice"]
    permission_classes = [GroupPermission]
    queryset = barringVoice.objects.all()
    serializer_class = BarringVoiceSerializer
    search_fields = ["operator_code", "code", "name", "carrier__name"]
    filterset_fields = [
        "operator_code",
        "code",
        "name",
        "carrier__id",
        "carrier__name",
    ]



class  SubscriptionDataSpeedAPI(viewsets.ModelViewSet):
    required_permissions= ["Can view Subscription data speeds","Can add Subscription data speeds","Can chnage Subscription data speeds","Can delete Subscription data speeds"]
   
    permission_classes = [GroupPermission]
    serializer_class = subscriptionDataSpeedSerializer
    queryset = subscriptionDataSpeed.objects.all()



class  SubscriptionVoicePackageAPI(viewsets.ModelViewSet):
    required_permissions= ["Can view subscription voice package","Can add subscription voice package","Can chnage subscription voice package","Can delete subscription voice package"]
   
    permission_classes = [GroupPermission]
    serializer_class = subscriptionVoicePackageSerializer
    queryset = subscriptionVoicePackage.objects.all()

class BarringSMSApiView(viewsets.ModelViewSet):

    required_permissions= ["Can view barring sms","Can add barring sms","Can chnage barring sms","Can delete barring sms"]
    permission_classes = [GroupPermission]
    queryset = barringSMS.objects.all()
    serializer_class = BarringSMSSerializer
    filterset_fields = ["operator_code", "code", "name", "carrier__id", "carrier__name"]
    search_fields = ["operator_code", "code", "name", "carrier__name"]


class BarringRoamingApiView(viewsets.ModelViewSet):

    required_permissions= ["Can view barring roaming","Can add barring roaming","Can chnage barring roaming","Can delete carrier"]
    permission_classes = [GroupPermission]
    queryset = barringRoaming.objects.all()
    serializer_class = BarringRoamingSerializer
    filterset_fields = ["operator_code", "code", "name", "carrier__id", "carrier__name"]
    search_fields = ["operator_code", "code", "name", "carrier__name"]


class BarringDataApiView(viewsets.ModelViewSet):

    required_permissions= ["Can view carrier",'"Can add carrier"',"Can chnage carrier",'"Can delete carrier"']
    permission_classes = [GroupPermission]
    queryset = barringData.objects.all()
    serializer_class = BarringDataSerializer
    filterset_fields = ["operator_code", "code", "name", "carrier__id", "carrier__name"]
    search_fields = ["operator_code", "code", "name", "carrier__name"]


class BarringRoamingDataApiView(viewsets.ModelViewSet):

    required_permissions= ["Can view barring roaming data","Can add barring roaming data","Can chnage barring roaming data","Can delete barring roaming data"]
    permission_classes = [GroupPermission]
    queryset = barringRoamingData.objects.all()
    serializer_class = BarringRoamingDataSerializer
    filterset_fields = ["operator_code", "code", "name", "carrier__id", "carrier__name"]
    search_fields = ["operator_code", "code", "name", "carrier__name"]


class mobileDataCodeApiView(viewsets.ModelViewSet):

    required_permissions= ["Can view mobile data code","Can add mobile data code","Can chnage mobile data code","Can delete mobile data code"]
    permission_classes = [GroupPermission]
    queryset = mobileDataCode.objects.all()
    serializer_class = mobileDataCodeSerializer

    search_fields = [
        "name",
    ]


#
class mobilePriorityApiView(viewsets.ModelViewSet):

    required_permissions= ["Can view mobile priority","Can add mobile priority","Can chnage mobile priority","Can delete mobile priority"]

    queryset = mobilePriority.objects.all()
    serializer_class = mobilePrioritySerializer
    search_fields = [
        "name",
    ]


class MobileProductApiView(viewsets.ModelViewSet):

    required_permissions= ["Can view mobile product","Can add mobile productr","Can chnage mobile product","Can delete mobile product"]
    permission_classes = [GroupPermission]
    queryset = mobileProduct.objects.all()
    serializer_class = MobileproductSerializer
    filterset_fields = ["carrier", "carrier__name"]

    search_fields = [
        "name",
        "carrier__name",
        "datacode__name",
        "dataspeed3GDown__name",
        "dataspeed3GUp__name",
        "dataspeed4GDown__name",
        "dataspeed4GUp__name",
        "voicepackage__name",
        "priority__name",
        "dataspeed3GDown__value",
        "dataspeed3GUp__value",
        "dataspeed4GDown__value",
        "dataspeed4GUp__value",
        "voicepackage__value",
    ]

    def get_serializer(self, *args, **kwargs):
        if self.request.method in ["POST", "PATCH", "PUT"]:
            serializer_class = self.get_serializer_class()
        else:
            serializer_class = MobileResponseSerializer
        kwargs.setdefault("context", self.get_serializer_context())
        return serializer_class(*args, **kwargs)




# class CdrsCallDetailsCAPI(APIView):
#     def get(self, request, id=None, format=None):
#         query_params = request.query_params
#         startdate = query_params.get('startdate', None) 
#         enddate = query_params.get('enddate', None) 
#         phonenumber = query_params.get('phonenumber', None) 
#         goodsign_org_identifier = query_params.get('goodsign_org_identifier', None)
#         payload = {
#                 "org_id" :goodsign_org_identifier,
#                 "startdate": startdate,
#                 "enddate": enddate,
#                 "phonenumber": phonenumber, 
            
#             }
#         org = request.headers.get("organization")
#         good_org_id = Organization.objects.filter(id=org).first()
#         obj = good_org_id.goodsign_org_identifier if good_org_id else None
#         try:
#             if settings.ENVIRONMENT in ["stage", "production"]:
#                 calldetails_url = "https://setera-api.setera.com/gsApi/calldetails" 
#                 # Construct the URL with query parameters
#                 calldetails_url += "?" + "&".join(f"{key}={value}" for key, value in payload.items())
#                 call_data_response = requests.get(calldetails_url)
                
#                 data = call_data_response.json()
#                 data = [{**entry, "goodsign_org_identifier": obj} for entry in data]
#                 count = len(data)
#                 response = {"count": count, "results": data } 

#             else:
#                 data = calldetail_dummydata
#                 data = [{**entry, "goodsign_org_identifier": obj} for entry in data]
#                 count = len(data)
#                 response = {"count": count, "results": data, }
                     
#             return Response(response, status=status.HTTP_200_OK)
#         except Exception as e:
#             return Response(status=status.HTTP_400_BAD_REQUEST)
        

    # def post(self, request, id=None, format=None):
    #     try:
    #         startdate = request.data.get("startdate")
    #         enddate = request.data.get("enddate")
    #         phonenumber = request.data.get("phonenumber")
    #         goodsign_org_identifier  = request.data.get("goodsign_org_identifier")
    #         payload = {
    #             "org_id" :goodsign_org_identifier,
    #             "startdate": startdate,
    #             "enddate": enddate,
    #             "phonenumber": phonenumber,
            
    #         }
    #         calldetails_url  = f"https://setera-api.setera.com/gsApi/calldetails"
    #         call_data_response = requests.post(calldetails_url, data=payload)
    #         data = call_data_response.json()
    #         count = len(data)
    #         response = {"count": count, "results": data}
    #         return Response(response, status=status.HTTP_200_OK)
    #     except Exception as e:
    #         return Response(status=status.HTTP_400_BAD_REQUEST)
            



