from django.urls import path, include
from apps.organization import views


urlpatterns = [
    path("organization/", views.OrgsForUserView.as_view(), name="orgListForUser"),
]
