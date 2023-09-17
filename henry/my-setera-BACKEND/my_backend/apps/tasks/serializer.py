from rest_framework import serializers
from apps.tasks.models import Task
from django.core.exceptions import ValidationError
from celery import shared_task
from apps.dna.serializer import provNotificationSerializer


@shared_task
def iscompete_notification(data):
    is_complete = data.get("is_complete")
    org_id = data.get("order_id")
    Task.objects.create(order_id=org_id, completed=is_complete, payload=data)


class Iscompletedserlializer(serializers.Serializer):
    data = serializers.JSONField()

    def validate(self, attrs):
        data = attrs.get("data")
        try:
            is_complete = data["is_complete"]
            org_id = data["order_id"]
        except KeyError as e:
            raise serializers.ValidationError(f"Missing field: {str(e)}")

        return attrs


class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = "__all__"














