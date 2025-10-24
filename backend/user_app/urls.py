from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import DonorAvailabilityUpdateView
from . import views
from .views import (
    UserRegistratioApiView,
    SendVerificationEmailApiView,
    VerifyEmailApiView,
)

urlpatterns = [
    # Registration
    path("register/", UserRegistratioApiView.as_view(), name="user-register"),
    path("send-verification/", SendVerificationEmailApiView.as_view(), name="send-verification"),
    path("verify-email/<uidb64>/<token>/", VerifyEmailApiView.as_view(), name="verify-email"),

    
    # JWT Login & Refresh
    path("api/users/login/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("api/users/refresh/", TokenRefreshView.as_view(), name="token_refresh"),

    # Logout
    path("logout/", views.LogoutView.as_view(), name="logout"),

    # Lists
    path("donors/", views.DonorListView.as_view(), name="donor-list"),
    path("blood-groups/", views.BloodGroupList.as_view(), name="blood-groups"),
    path("locations/", views.LocationListView.as_view(), name="locations"),

    # Role-based dashboards
    path("dashboard/admin/", views.AdminDashboardView.as_view(), name="admin_dashboard"),
    path("dashboard/hospital/", views.HospitalDashboardView.as_view(), name="hospital_dashboard"),
    path("dashboard/donor/", views.DonorDashboardView.as_view(), name="donor_dashboard"),
    path("dashboard/requester/", views.RequesterDashboardView.as_view(), name="requester_dashboard"),

    path("donor/availability/", DonorAvailabilityUpdateView.as_view(), name="donor-availability"),
]
