from apps.users.models import SeteraUser ,UserRoles


from django.contrib.auth.models import Group
from django.core.management.base import BaseCommand
from apps.users.models import UserRoles


class Command(BaseCommand):
    def handle(self, *args, **options):
        supervisor_group = Group.objects.get(name='Supervisor')
        reseller_agent_group = Group.objects.get(name='ResellerAgent')
        customer_admin_group = Group.objects.get(name='CustomerAdmin')
        reseller_group = Group.objects.get(name='Reseller')

        setera_users = SeteraUser.objects.all()
        for user in setera_users:
            if user.role.name == "Supervisor":
                supervisor_group.user_set.add(user)
            elif user.role.name == "ResellerAgent":
                reseller_agent_group.user_set.add(user)
            elif user.role.name == "CustomerAdmin":
                customer_admin_group.user_set.add(user)
            elif user.role.name == "Reseller":  
                # Add this block for the "Reseller" group
                reseller_group.user_set.add(user)
        
       
  
