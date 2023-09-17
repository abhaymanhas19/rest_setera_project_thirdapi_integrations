from apps.users.models import *
from apps.organization.models import *
from django.contrib.auth.password_validation import validate_password
from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


class OrgSerializer(serializers.ModelSerializer):
    is_primary = serializers.SerializerMethodField()

    def get_is_primary(self, validated_data):
        return bool(validated_data.id == self.context["request"].user.organization.id)

    class Meta:
        model = Organization
        fields = (
            "id",
            "name",
            "agent",
            "reseller",
            "information",
            "is_sale_agent",
            "is_sale_agent_organization",
            "is_sale_reseller",
            "is_sale_reseller_customer",
            "goodsign_org_identifier",
            "odoo_org_identifier",
            "is_primary",
        )
        lookup_field = "name"
        filterset_fields = [
            "is_primary",
        ]
