from django.urls import path, include
from apps.tasks import views

from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register("tasks", views.TaskApiView, basename="tasks")


urlpatterns = [
    path("add-cirtificate", views.AddCirtificate.as_view(), name="addcirtificate"),
    path("create-task", views.CrateTask.as_view(), name="createtask"),
    path("do-task", views.Dotask.as_view(), name="dotask"),
    path("create-opr", views.CreateOPR.as_view(), name="createopr"),
    path("create-dna-opr", views.CreateDnaOPR.as_view(), name="creatednaopr"),
    path("change-mobile-product",views.ChangeMobileProduct.as_view(),name="changemobileproduct" ),
    path("task-data-barring", views.DataBarrings.as_view(), name="taskdatabarring"),
    path("dna-modify-roming-limit",views.DnaModifyRomingLimit.as_view(),name="dnamodifyrominglimit"),
    path("roming-services", views.RomingServices.as_view(), name="romingservices"),
    path("remove-services", views.RemoveService.as_view(), name="removeservices"),
    path("insert-service-id",views.CheckandInsertDeleteServiceIdApi.as_view(), name="insertserviceid" ),
    path("dna-terminate-mobile",views.DnaTrerminateMobile.as_view(),name="dnaterminatemobile" ),
    path("iscompleted/",views.IscompleteAPI.as_view(),name="iscompleted")
] + router.urls
