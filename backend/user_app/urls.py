from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import (
    UserRegistratioApiView,
    SendVerificationEmailApiView,
    VerifyEmailApiView,
    UserProfileView,
    GoogleLoginView,
    DonorAvailabilityUpdateView,
    LogoutView,
    DonorListView,
    BloodGroupList,
    LocationListView,
    AdminDashboardView,
    HospitalDashboardView,
    DonorDashboardView,
    RequesterDashboardView,
)

urlpatterns = [
    path("register/", UserRegistratioApiView.as_view(), name="user-register"),
    path("send-verification/", SendVerificationEmailApiView.as_view(), name="send-verification"),
    path("verify-email/<uidb64>/<token>/", VerifyEmailApiView.as_view(), name="verify-email"),
    path("login/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("google-login/", GoogleLoginView.as_view(), name="google-login"),
    path("logout/", LogoutView.as_view(), name="logout"),
    path("donors/", DonorListView.as_view(), name="donor-list"),
    path("blood-groups/", BloodGroupList.as_view(), name="blood-groups"),
    path("locations/", LocationListView.as_view(), name="locations"),
    path("dashboard/admin/", AdminDashboardView.as_view(), name="admin_dashboard"),
    path("dashboard/hospital/", HospitalDashboardView.as_view(), name="hospital_dashboard"),
    path("dashboard/donor/", DonorDashboardView.as_view(), name="donor_dashboard"),
    path("dashboard/requester/", RequesterDashboardView.as_view(), name="requester_dashboard"),
    path("donor/availability/", DonorAvailabilityUpdateView.as_view(), name="donor-availability"),
    path("profile/", UserProfileView.as_view(), name="user-profile"),
]
