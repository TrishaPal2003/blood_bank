from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import BloodRequestViewSet, DonationHistoryViewSet

router = DefaultRouter()
router.register("requests", BloodRequestViewSet, basename="bloodrequest")
router.register("history", DonationHistoryViewSet, basename="donationhistory")

urlpatterns = [
    path("", include(router.urls)),
]
