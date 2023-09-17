from django.urls import path, include
from apps.mobile import views

from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register("carrier", views.CarrierApiView, basename="carriers")
router.register("mobile-data-code", views.mobileDataCodeApiView, basename="mobiledatacodes")
router.register("barring-mms", views.BarringMMSApiView, basename="barringmms")
router.register("barring-voice", views.BarringVoiceApiView, basename="barringvoice")
router.register("barring-sms", views.BarringSMSApiView, basename="barringsms")
router.register("mobile-priotity", views.mobilePriorityApiView, basename="mobilepriotity")
router.register("mobile-product", views.MobileProductApiView, basename="mobileproduct")
router.register("barring-roaming", views.BarringRoamingApiView, basename="barringroaming")
router.register("barring-data", views.BarringDataApiView, basename="barringdata")
router.register("barring-roaming-data",views.BarringRoamingDataApiView,basename="barringroamingdata")
router.register("subscription", views.SubscriptionApiView, basename="Subscription")
router.register("sim", views.SIMApiView, basename="sim")
router.register("subscription-speed", views.SubscriptionDataSpeedAPI, basename="subscription-speed")
router.register("subscriptionvoice-package", views.SubscriptionVoicePackageAPI, basename="subscriptionvoice-package")


urlpatterns = [
    path("test", views.sub),
    path("barring-roamingdata-update/<int:id>/", views.BarringroamingdataUpdateApiView.as_view(), name="barring-roamingdata-update"),
    path("mobile-product-update/<int:id>/",views.Mobile_productUpdateApiView.as_view(),name="mobile-product-update"),
    path("sim-update/<int:id>/",views.SubscriptionSIMUpdateAPI.as_view(), name="sim-update"),
    path("temp-close/<int:id>/",views.TemporarilyClosedApiView.as_view(),name="temp-close"),
    path("temp-open/<int:id>/", views.TemporarilyopenApiView.as_view(), name="temp-open" ),
    path("end-subscription/<int:id>/",views.Endsubscription.as_view(), name="end-subscription",),
    path("catalog/", views.catelogcreateServicesApiView.as_view(), name="catalog"),
    path("catalog/<int:pk>/", views.catelogServicesUpdateApiView.as_view(), name="catalog"),
    

] + router.urls

