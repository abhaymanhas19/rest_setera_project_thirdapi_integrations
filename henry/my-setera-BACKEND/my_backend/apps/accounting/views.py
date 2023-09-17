# Create your views here.
from rest_framework.response import Response

from rest_framework import status
from rest_framework.views import APIView
from apps.accounting.serializer import (
    seteraSOS,
    seterasosdetails,
    seteraSubscription,
    seteraSubscriptionDetail,
    descriptionaccounting,
    calldetail_dummydata,
    
)
from apps.utils.utils import userpermisson
from django.conf import settings
from apps.accounting.dummydata import (
    dummy_sales_order_detail,
    dummy_sales_order_list,
    dummy_sub_list,
    dummy_sub_detail,
    Summary_by_subscription,
    Summary_by_services,
    Call_history_report,
    
)

from apps.users.haspermission import GroupPermission

import requests
from apps.organization.models import Organization

# from apps.tasks.helperfunctions import selesorder


class SalesOrderAPI(APIView):
    required_permissions= ["Can view accounting salesorder",]
    permission_classes = [GroupPermission]
    def get(self, request, id=None, format=None):
        # func = userpermisson(request)
        # obj = func.permissions.filter(name= "Can view accounting salesorder").exists()
        # if not obj:
        #     return  Response({"statusText":"Forbidden"},status=status.HTTP_403_FORBIDDEN,)
            
        org = request.headers.get("organization")
        try:
            if id is not None:
                if settings.ENVIRONMENT in ["stage", "production"]:
                    data = seterasosdetails(id)
                    count = len(data)
                    response = data
                else:
                    response = dummy_sales_order_detail
            else:
                if settings.ENVIRONMENT in ["stage", "production"]:
                    salesorders = seteraSOS(org)
                    count = len(salesorders)
                    response = {"count": count, "results": salesorders}
                else:
                    response = {
                        "count": len(dummy_sales_order_list),
                        "results": dummy_sales_order_list,
                    }

            return Response(response, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)


class Subscription(APIView):
    required_permissions= ["Can view accounting subscription",]
    permission_classes = [GroupPermission]
    def get(self, request, id=None, format=None):
        # func = userpermisson(request)
        # obj = func.permissions.filter(name= "Can view accounting subscription").exists()
        # if not obj:
        #     return  Response({"statusText":"Forbidden"},status=status.HTTP_403_FORBIDDEN,)
        
        org = request.headers.get("organization")
        try:
            if id is not None:
                if settings.ENVIRONMENT in ["stage", "production"]:
                    data = seteraSubscriptionDetail(id)
                    response = data
                else:
                    response = dummy_sub_detail
            else:
                if settings.ENVIRONMENT in ["stage", "production"]:
                    salesorders = seteraSubscription(org)
                    count = len(salesorders)
                    response = {"count": count, "results": salesorders}
                else:
                    response = {"count": len(dummy_sub_list), "results": dummy_sub_list}
            return Response(response, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)



class AccountingDescription(APIView):
    def get(self,request,format=None):
        func= userpermisson(request)
        # obj = func.permissions.filter(name= "Can View Accounting").exists()
        # if not obj:
        #     return  Response({"message":"Permission denied"},status=status.HTTP_400_BAD_REQUEST,)
   

        org = request.headers.get('organization')
        summery_type =request.query_params.get("summery_type") 
        try:
            if settings.ENVIRONMENT in ["stage", "production"]:
                summery = {
                    "subscription":descriptionaccounting() ,
                    "service":descriptionaccounting(),
                    "detailedsummery" :descriptionaccounting(),
                }
            
            else:
                summery = {
                    "subscription": Call_history_report,
                    "service":Summary_by_services,
                    "detailedsummery" :dummy_sub_detail,

                }
            response = summery.get(summery_type)
            response = {"count": len(response), "results": response}
            return Response(response,status=status.HTTP_200_OK)

        except Exception as e:
            print
            return Response({"message":"Not found"},status=status.HTTP_400_BAD_REQUEST)









class CdrsCallDetailsCAPI(APIView):
    required_permissions= ["Can view  accounting traffic"]
    permission_classes = [GroupPermission]
    def get(self, request, id=None, format=None):
        # func = userpermisson(request)
        # obj = func.permissions.filter(name= "Can view accounting traffic").exists()
        # if not obj:
        #     return  Response({"statusText":"Forbidden"},status=status.HTTP_403_FORBIDDEN,)
        query_params = request.query_params
        startdate = query_params.get('startdate', None) 
        enddate = query_params.get('enddate', None) 
        phonenumber = query_params.get('phonenumber', None) 
        goodsign_org_identifier = query_params.get('goodsign_org_identifier', None)
        payload = {
                "org_id" :goodsign_org_identifier,
                "startdate": startdate,
                "enddate": enddate,
                "phonenumber": phonenumber, 
            
            }
        org = request.headers.get("organization")
        good_org_id = Organization.objects.filter(id=org).first()
        obj = good_org_id.goodsign_org_identifier if good_org_id else None
        try:
            if settings.ENVIRONMENT in ["stage", "production"]:
                calldetails_url = "https://setera-api.setera.com/gsApi/calldetails" 
                # Construct the URL with query parameters
                calldetails_url += "?" + "&".join(f"{key}={value}" for key, value in payload.items())
                call_data_response = requests.get(calldetails_url)
                
                data = call_data_response.json()
                data = [{**entry, "goodsign_org_identifier": obj} for entry in data]
                count = len(data)
                response = {"count": count, "results": data } 

            else:
                data = calldetail_dummydata
                data = [{**entry, "goodsign_org_identifier": obj} for entry in data]
                count = len(data)
                response = {"count": count, "results": data, }
                     
            return Response(response, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)
