from django.shortcuts import render

# Create your views here.
from django.shortcuts import render, HttpResponse

# Create your views here.
from rest_framework.decorators import api_view
from rest_framework.response import Response

from rest_framework import generics
from apps.organization.models import *
from rest_framework.permissions import AllowAny, IsAuthenticated
from .serializer import *
from .models import *
from rest_framework import viewsets
from rest_framework import status
from rest_framework import generics
from typing import List
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404
from apps.utils.orgmixin import orginizationModelMixin
from apps.mobile.models import Subscription
from .helperfunctions import *
from apps.users.haspermission import GroupPermission

task = ""

class IscompleteAPI(APIView):
    def post(self,request,format=None):
        serializer = Iscompletedserlializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            data = serializer.validated_data["data"]
            iscompete_notification.apply_async(args=[data])
            # iscompete_notification(data)
            return Response(serializer.data , status=status.HTTP_400_BAD_REQUEST)


class AddCirtificate(orginizationModelMixin, APIView):
    def get(self, request):
        # try:
            user_sub = Subscription.objects.filter(
                organization=self.request.headers["organization"]
            ).first()
            if not user_sub:
                return Response(
                    {"message": "No Subscription Found"}, status=status.HTTP_400_BAD_REQUEST
                )
            # dnaAddCertificate(test)
            return Response(
                {"message": "Certificate add Successfully"}, status=status.HTTP_200_OK
            )

        # except Exception as e:
        #     return Response({"message": "somethig went wrong"},status=status.HTTP_400_BAD_REQUEST)














































































class CrateTask(APIView):
    def get(self, request):
        createTask(task)

        return Response(status=status.HTTP_200_OK)


class Dotask(APIView):
    def get(self, request):
        doTask(task)
        return Response(status=status.HTTP_200_OK)


class CreateOPR(APIView):
    def get(self, request):
        createOPR(task)
        return Response(status=status.HTTP_200_OK)


class CreateDnaOPR(APIView):
    def get(self, request):
        createDnaOPR(task)
        return Response(status=status.HTTP_200_OK)


class ChangeMobileProduct(APIView):
    def get(self, request):
        changeMobileProduct(task)
        return Response(status=status.HTTP_200_OK)


class DataBarrings(APIView):
    def get(self, request):
        dnaBarrings(task)
        return Response(status=status.HTTP_200_OK)


class DnaModifyRomingLimit(APIView):
    def get(self, request):
        dnaModifyRoamingLimit(task)
        return Response(status=status.HTTP_200_OK)


class RomingServices(APIView):
    def get(self, request):
        removeService(task)
        return Response(status=status.HTTP_200_OK)


class DnaChangeSim(APIView):
    def get(self, request):
        dnaChangeSim(task)
        return Response(status=status.HTTP_200_OK)


class RemoveService(APIView):
    def get(self, request):
        removeService(task)
        return Response(status=status.HTTP_200_OK)


class CheckandInsertDeleteServiceIdApi(APIView):
    def get(self, request):
        checkAndInsertDeleteServiceId(task)
        return Response(status=status.HTTP_200_OK)


class DnaTrerminateMobile(APIView):
    def get(self, request):
        dnaTerminateMobile(task)
        return Response(status=status.HTTP_200_OK)




class TaskApiView(viewsets.ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer









