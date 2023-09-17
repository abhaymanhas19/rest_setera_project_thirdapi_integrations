from django.urls import path, include
from apps.dna import views


from rest_framework.routers import DefaultRouter

router = DefaultRouter()


urlpatterns = [
    path(
        "prov-notification/",
        views.provNotificationAPI.as_view(),
        name="pro-notification",
    ),
    path("service-id/", views.serviceIdAPI.as_view(), name="service-id"),
] + router.urls
