from django.shortcuts import render, HttpResponse

# Create your views here.
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView, InvalidToken, TokenError
from rest_framework import generics
from apps.organization.models import *
from rest_framework.permissions import AllowAny, IsAuthenticated

from rest_framework.authentication import SessionAuthentication
from django_rest_passwordreset.views import ResetPasswordConfirm
from .serializer import *
from .models import *
from rest_framework import viewsets
from rest_framework import status
from rest_framework import generics

# Create your views here.
from django.contrib.auth.hashers import check_password
from rest_framework_simplejwt.authentication import JWTAuthentication
from .email import *
from typing import List

from apps.utils.orgmixin import orginizationModelMixin
from django.conf import settings
from django.core.cache.backends.base import DEFAULT_TIMEOUT
from rest_framework.views import APIView
from django.contrib.auth import authenticate, login, logout
import uuid
import jwt
import datetime
from apps.utils.utils import send_login_otp

from apps.users.haspermission import GroupPermission
import random

from django.contrib.contenttypes.models import ContentType
from apps.utils.utils import userpermisson





CACHE_TTL = getattr(settings, "CACHE_TTL", DEFAULT_TIMEOUT)


class LoginMobileOTPAPI(APIView):
    permission_classes = ()
    serializer_class = LoginSerializerOTP

    def post(self, request):
        email = request.data.get("email")
        password = request.data.get("password")
        user = authenticate(request=request, email=email, password=password)
        if user:
            auth_token = jwt.encode(
                {
                    "email": user.email,
                    "id": user.id,
                    "otp": random.randint(1000, 9999),
                    "exp": datetime.datetime.timestamp(
                        (datetime.datetime.now() + datetime.timedelta(minutes=2))
                    ),
                },
                j_key,
                "HS256",
            )
            token_data = jwt.decode(auth_token, j_key, algorithms=["HS256"])
            del token_data["otp"]  # Remove 'otp' field from token_data
            modified_auth_token = jwt.encode(token_data, j_key, "HS256")

            if settings.DEBUG:
                send_login_otp(auth_token)
                response_token = auth_token
            else:
                send_login_otp(modified_auth_token)
                response_token = modified_auth_token

            return Response(
                {"message": "OTP Send Successfully", "token": response_token}
            )
        return Response(
            {"message": "Invalid Credentials"}, status=status.HTTP_401_UNAUTHORIZED
        )


class MobileAcessTokenAPI(APIView):
    permission_classes = ()
    serializer_class = Loginserializer

    def post(self, request):
        serializer = MyTokenObtainPairSerializer(
            data=request.data, context={"request": request}
        )
        try:
            serializer.is_valid(raise_exception=True)
        except Exception as e:
            raise InvalidToken(e.args[0])
        return Response(serializer.validated_data, status=status.HTTP_200_OK)


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


class RegisterView(generics.CreateAPIView):
    queryset = SeteraUser.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer



class UserRoleApiview(viewsets.ModelViewSet):
    required_permissions = ['Can add user roles', 'Can view user roles','Can change user roles','Can delete user roles']
    # required_permissions = ['auth.add_userroles', 'auth.view_userroles', 'auth.change_userroles', 'auth.delete_userroles']


    permission_classes = [GroupPermission]
    authentication_classes = [SessionAuthentication, JWTAuthentication]
    # queryset = UserRoles.objects.all()
    serializer_class = UserroleSerializer

    def get_queryset(self):
        return UserRoles.objects.all()


class AdduserAPI(orginizationModelMixin, viewsets.ModelViewSet):
    permission_classes = [GroupPermission]
    serializer_class = AdminAddUserSerializer
    queryset = SeteraUser.objects.all()

    def perform_create(self, serializer):
        name = self.request.user.first_name
        try:

            obj = Organization.objects.filter(name=name).first()
            serializer.save(organization_id=obj.id)
        except Exception as e:
            return  Response({"message":"No orginization found"},status=status.HTTP_400_BAD_REQUEST)

    def get_queryset(self):
        return (
            super()
            .get_queryset()
            .filter(organization=self.request.headers["organization"])
        )


class myrole(generics.ListAPIView):
    permission_classes = [IsAuthenticated]

    queryset = UserRoles.objects.all()
    serializer_class = UserroleSerializer


class UserDetailsAPi(orginizationModelMixin, viewsets.ModelViewSet):

    required_permissions= ["Can view carrier",'"Can add carrier"',"Can chnage carrier",'"Can delete carrier"']
    serializer_class = UsersSerializers
    http_method_names: List[str] = ["get", "patch"]
    queryset = SeteraUser.objects.all()

    def get_queryset(self):
        return (
            super()
            .get_queryset()
            .filter(organization=self.request.headers["organization"])
        )






class ForgetApiView(generics.CreateAPIView):
    serializer_class = ForgetPasswordSerializer
    permission_classes = ()

    def create(self, request, *args, **kwargs):
        token = uuid.uuid1()
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid(raise_exception=True):
            email = serializer.data["email"]
            user = SeteraUser.objects.filter(email=email).first()
            token_instance, _ = EmailToken.objects.get_or_create(user=user)
            token_instance.email_token = token
            token_instance.save()
            send_reset_password_token(
                email,
                token,
            )
            return Response({"message": "Email Send Succefully"})
        return Response(
            {"message": "Not valid Email"}, status=status.HTTP_400_BAD_REQUEST
        )


class VerifyResetPassword(generics.CreateAPIView):
    serializer_class = VerifyPasswordSerializer
    permission_classes = ()

    def post(self, request,token, *args, **kwargs):
      
        serializer = VerifyPasswordSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            token = serializer.validated_data["token"]
            newpassword = serializer.validated_data["password"]
            token_instance = EmailToken.objects.filter(email_token=token).first()
            user = token_instance.user
            user.set_password(newpassword)
            user.save()
            token_instance.delete()
            return Response(
                {"message": "password updated successfully"},
                status=status.HTTP_202_ACCEPTED,
            )

        return Response(
            {"message": "Invalid Email or Token"}, status=status.HTTP_400_BAD_REQUEST
        )



class UserGroupslistAPI(viewsets.ModelViewSet):
    http_method_names = ["get","post"]
    queryset = Group.objects.all()
    serializer_class = Grouplistserializer





class UserPermissionlistAPI(viewsets.ReadOnlyModelViewSet):
    http_method_names = ["get"]
    serializer_class = UserPermissionlistserializer
    queryset = Permission.objects.all()

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        serializer = UserPermissionlistserializer(queryset, many=True)
        data = serializer.data
        excluded_model_names = ["task","group","emailtoken",'logentry', 'log',"permission","tokenproxy","token","dummycontenttype","Accounting","contenttype","clockedschedule","crontabschedule","intervalschedule","periodictasks","periodictask","outstandingtoken","blacklistedtoken","task","session","queue","resetpasswordtoken","taskresult","groupresult","chordcounter","solarschedule"]
        data = [item for item in data if item['model_name'] not in excluded_model_names]
        user_groups = request.user.groups.all()
        
        try:
            grouped_data = {}
            for item in data:
                o = Permission.objects.filter(id=item["id"])
                for i in o:
                    i.content_type.model
                    jj = item["name"]
                    lines = jj.split('\n')
                    filtered_lines = [line.replace('Can add ', '').replace('Can change ', '').replace('Can delete ', '').replace('Can view ', '') for line in lines]

                    result_string = '\n'.join(filtered_lines)
                    if result_string not in grouped_data:
                        grouped_data[result_string] = []

                    for group in user_groups:
                        group_permissions = group.permissions.filter(id=item['id']).exists()
                        grouped_data[result_string].append({
                            'id': item['id'],
                            'name': item['name'],
                            "has_permission": group_permissions
                        })
                        
            # Convert the grouped_data dictionary to a list of dictionaries
            result_list = [{'model_name': key, 'permissions': value} for key, value in grouped_data.items()]
            response = {"count": len(result_list), "results": result_list}
            return Response(response)
        
        except Exception as e:
            context = {
                "message": "User group does not exist"
            }
            return Response(context, status=status.HTTP_400_BAD_REQUEST)




class UserGroupPermissionAPI(viewsets.ModelViewSet):

    queryset = Group.objects.all()
    serializer_class = CreateGroupPermissionSerializer
    permission_classes = [IsAuthenticated]
    http_method_names = ['get',"put","patch"]

    def get_serializer(self, *args, **kwargs):
        if self.request.method in ["PUT", "PATCH", "DELETE"]:
            serializer_class = self.get_serializer_class()
        else:
            serializer_class = UserResposeGroupAPIserializer
        return serializer_class(*args, **kwargs)
    
    # def get_queryset(self):
    #     user = self.request.user
    #     group_name = user.groups.first()

    #     if group_name.name == "Supervisor":
    #         # Return the queryset for supervisors
    #         return Group.objects.all()  # Adjust this queryset based on your model.
        
    #     return Group.objects.none()

 

class AccountingPermissionListView(generics.ListAPIView):
    pass
    serializer_class = AccountingPermissionSerializer
    permission_classes = [IsAuthenticated] 

    def get_queryset(self):
        users_with_permission =  Permission.objects.filter(codename='view_accounting')
        
    
        dummy_content_type, _ = ContentType.objects.get_or_create(
            app_label='custom_permissions',  # Use your app label
            model='accounting',         # Use a unique model name
        )
        
        view_accounting_permission, _ = Permission.objects.get_or_create(
            codename='view_accounting',
            name='Can View Accounting',
            content_type=dummy_content_type,
        )
        
        permission = Permission.objects.get(codename='view_accounting')
        
        context = {
            "message": "Done"
        }
        
        return users_with_permission

#for update the data of permission because  its missing form admin 
class InbuiltpermissionAPI (viewsets.ModelViewSet):
    serializer_class = Inbuiltpermission
    queryset = Permission.objects.all()

# class UserPermissionlistAPI(viewsets.ReadOnlyModelViewSet):
#     http_method_names = ["get"]
#     serializer_class = UserPermissionlistserializer
#     queryset = Permission.objects.all()


#     def list(self, request, *args, **kwargs):
#         count = 0
#         queryset = self.filter_queryset(self.get_queryset())
#         serializer = UserPermissionlistserializer(queryset, many=True)
#         data = serializer.data
#         excluded_model_names = ["task","userroles","group","emailtoken",'logentry', 'log',"permission","tokenproxy","token","dummycontenttype","Accounting","contenttype","clockedschedule","crontabschedule","intervalschedule","periodictasks","periodictask","outstandingtoken","blacklistedtoken","task","session","queue","resetpasswordtoken","taskresult","groupresult","chordcounter","solarschedule"]
#         data = [item for item in data if item['model_name'] not in excluded_model_names]
#         user_groups = request.user.groups.all()
#         try:
        
#             grouped_data = {}
            
#             for item in data:
#                 obj= Permission.objects.filter(id=item["id"])
#                 for i  in obj:
#                     i.content_type.model

#                 if i.content_type.model not in grouped_data:
#                     grouped_data[i.content_type.model] = []

#                 for group in user_groups:
#                     group_permissions = group.permissions.filter(id=item['id']).exists()
                    
#                     grouped_data[i.content_type.model].append({
#                         'id': item['id'],
#                         'name': item['name'],
#                         "has_permission": group_permissions
#                     })


#             # Convert the grouped_data dictionary to a list of dictionaries
#             result_list = [{'model_name': key, 'permissions': value} for key, value in grouped_data.items()]

#             response = {"count": len(result_list), "results": result_list}

#             return Response(response)
#         except Exception as e:
#                 context = {
#                     "message": "User g print("-------------------------------------------",self.request.user.groups.first())roup does not exist"
#                 }
#                 return Response(context, status=status.HTTP_400_BAD_REQUEST)

