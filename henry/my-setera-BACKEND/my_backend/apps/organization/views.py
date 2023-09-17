from django.shortcuts import render, HttpResponse
from django.db.models import Q

# Create your views here.
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import generics
from apps.organization.models import *
from rest_framework.permissions import AllowAny, IsAuthenticated

from rest_framework.authentication import SessionAuthentication
from rest_framework_simplejwt.authentication import JWTAuthentication
from .serializer import *
from .models import *
from rest_framework import viewsets

# Create your views here.
from rest_framework.decorators import action
from django.shortcuts import get_object_or_404
from rest_framework import status

# class OrganizationMixing:
from django.contrib.auth.mixins import LoginRequiredMixin

from django.contrib.auth.decorators import login_required

from apps.utils.orgmixin import orginizationModelMixin
from apps.users.haspermission import GroupPermission


class OrgsForUserView(generics.ListAPIView):
    required_permissions= ["Can view organization","Can add organization","Can chnage organization","Can delete organization "]
    permission_classes = [GroupPermission]
    authentication_classes = [SessionAuthentication, JWTAuthentication]
    serializer_class = OrgSerializer
    search_fields = ["name", "id"]
    filterset_fields = [
        "name",
    ]

    def get_queryset(self):

        user_org = self.request.user.organization
        user_role = self.request.user.role.name
        role_based_queryset = {
            "Supervisor": Organization.objects.all(),
            "Reseller": Organization.objects.filter(
                Q(reseller=user_org) | Q(id=user_org.id)
            ),
            "ResellerAgent": Organization.objects.filter(agent=user_org),
            "CustomerAdmin": Organization.objects.filter(id=user_org.id),
        }
        queryset = role_based_queryset.get(user_role)

        # Apply search filtering
        search_query = self.request.query_params.get("search", None)
        # if search_query:
        #     queryset = queryset.filter(
        #         Q(name__icontains=search_query) | Q(id=search_query)
        #     )

        return queryset
