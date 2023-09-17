from rest_framework import permissions
from django.contrib.auth.models import Group, Permission
from rest_framework.response import Response



    
from rest_framework import permissions


from rest_framework import permissions

class GroupPermission(permissions.BasePermission):
    """
    Custom permission to check if the user has a permission related to a specific group.
    """
    def has_permission(self, request, view):
        try:
            group_name = request.user.groups.first()
            if group_name.name == "Supervisor":
                return True
            view_name = view.__class__.__name__
            
            required_permissions = getattr(view, 'required_permissions', [])
            # Check if the user has any of the required permissions for the group
            user_permissions = group_name.permissions.filter(name__in=required_permissions)
            
            if request.method == 'GET' and user_permissions.filter(name__startswith="Can view").exists():
                return True
            elif request.method == 'POST' and user_permissions.filter(name__startswith="Can add").exists():
                return True
            elif request.method in ['PUT', 'PATCH'] and user_permissions.filter(name__startswith="Can change").exists():
                return True
            elif request.method == 'DELETE' and user_permissions.filter(name__startswith="Can delete").exists():
                return True

            return False
        except Exception as e:
            print(e)
            return False


