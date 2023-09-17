from django.urls import path, include
from apps.accounting import views

#accounting
urlpatterns = [
    path("sales-order/", views.SalesOrderAPI.as_view(), name="sales-order"),
    path("sales-order/<id>/", views.SalesOrderAPI.as_view(), name="sales-order-detail"),
    path("subscription/", views.Subscription.as_view(), name="subscription"),
    path("subscription/<id>", views.Subscription.as_view(), name="subscriptionpdetail"),
    path('description/', views.AccountingDescription.as_view(), name='accounting-description'),
    path("call-details/" , views.CdrsCallDetailsCAPI.as_view(), name="call-details"),
]
