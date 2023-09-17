from django.contrib import admin
from django.contrib.auth.admin import UserAdmin ,GroupAdmin
from django.contrib.auth.models import Group,Permission
# from .forms import CustomUserCreationForm, CustomUserChangeForm
from .models import SeteraUser, UserRoles,EmailToken
from django.core.exceptions import ValidationError
from django.contrib import messages

class CustomUserAdmin(UserAdmin):
    model = SeteraUser
    search_fields = ("email",)
    list_display = (
        "id",
        "first_name",
        "email",
        "last_name",
        "mobile",
        "organization",
        "is_staff",
        "is_active",
        "date_joined",
        "role",
    )
    list_filter = (
        "role",
        "is_staff",
        "is_active",
    )
    fieldsets = (
        (
            None,
            {
                "fields": (
                    "first_name",
                    "last_name",
                    "mobile",
                    "email",
                    "password",
                    "organization",
                    "role",
                    "date_joined",
                    "last_login",
                )
            },
        ),
        ("Permissions", {"fields": ("is_superuser", "is_staff", "is_active","groups", "user_permissions",)}),
    )
    add_fieldsets = (
        (
            None,
            {
                "classes": ("wide",),
                "fields": (
                    "email",
                    "first_name",
                    "last_name",
                    "mobile",
                    "password1",
                    "password2",
                    "organization",
                    "role",
                    # "groups"
                ),
            },
        ),
        (
            "Permissions",
            {
                "fields": (
                    "is_superuser",
                    "is_staff",
                    "is_active",
                )
            },
        ),
    )
    search_fields = (
        "first_name",
        "email",
        "organization__name",
    )
    ordering = ("email",)

    def save_model(self, request, obj, form, change):
       
        super().save_model(request, obj, form, change)

        try:
            group = Group.objects.get(name=obj.role)
        except Group.DoesNotExist:
    
            pass
        else:
    
            group.user_set.add(obj)




















admin.site.register(SeteraUser, CustomUserAdmin)


@admin.register(UserRoles)
class UserRoleAdmin(admin.ModelAdmin):
    list_display = ("id", "name")
    search_fields = [
        "name",
    ]



@admin.register(EmailToken)
class EmailTokenAdmin(admin.ModelAdmin):
    list_display = ("id", "user","email_token")
   
    








# from django.contrib.auth.models import Permission
# @admin.register(Permission)
# class AdminPermission(admin.ModelAdmin):
#     list_display = ['id','name']



# from django.contrib.contenttypes.models import ContentType





# class CustomGroupAdmin(GroupAdmin):
#     def formfield_for_manytomany(self, db_field, request=None, **kwargs):
#         if db_field.name == 'permissions':
#             qs = kwargs.get('queryset', db_field.remote_field.model.objects)
#             qs = qs.exclude(,
# #                 "delete_logentry",codename__in=(
                

#                 'add_logentry',
#                 "view_logentry",
#                 "change_logentry"


    
# #             ))
#             # Avoid a major performance hit resolving permission names which
#             # triggers a content_type load:
#             kwargs['queryset'] = qs.select_related('content_type')
#         return super(GroupAdmin, self).formfield_for_manytomany(
#             db_field, request=request, **kwargs)






# admin.site.unregister(Group)
# admin.site.register(Group, CustomGroupAdmin)





















# 'add_permission',
#                 'change_permission',
#                 'delete_permission',
#                 "view_permission",

#                 'add_contenttype',
#                 'change_contenttype',
#                 'delete_contenttype',
#                 'view_contenttype',

#                 'add_group',
#                 'change_group',
#                 'delete_group',
#                 'view_group',

                
#                 'add_user',
#                 'change_user',
#                 'delete_user',
#                 'view_user',

#                 'add_logentry',
#                 "view_logentry",
#                 "change_logentry",
#                 "delete_logentry",

#                 "add_session",
#                 "delete_session",
#                 "view_session",
#                 "change_session",
