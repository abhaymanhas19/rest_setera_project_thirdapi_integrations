from django.contrib.auth.models import Group
from django.core.management.base import BaseCommand
from apps.users.models import UserRoles


class Command(BaseCommand):
    def handle(self, *args, **options):
        group=[]
        obj = UserRoles.objects.all()
        for i in obj:
            group.append(i)
        for i in group:
            Group.objects.get_or_create(name=i)
