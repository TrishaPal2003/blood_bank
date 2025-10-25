from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from django.contrib.auth.models import User
from django.core.mail import send_mail
from django.conf import settings

from .models import BloodRequest, DonationHistory
from .serializers import BloodRequestSerializer, DonationHistorySerializer
from .permissions import IsHospitalOrReadOnly, IsAdminForStatusChange
from rest_framework.permissions import IsAuthenticated
from rest_framework import filters
from user_app.utils import get_available_donors


class BloodRequestViewSet(viewsets.ModelViewSet):
    queryset = BloodRequest.objects.all().order_by("-created_at")
    serializer_class = BloodRequestSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        """
        Called automatically when a new BloodRequest is created.
        """
        blood_request = serializer.save()

        # Notify eligible donors
        donors = get_available_donors(
            blood_group=blood_request.blood_group, location=blood_request.location
        )
        for donor in donors:
            send_mail(
                subject=f"Blood Request: {blood_request.blood_group}",
                message=f"Hi {donor.username}, a hospital near you needs {blood_request.blood_group} blood.",
                from_email="noreply@bloodbank.com",
                recipient_list=[donor.email],
                fail_silently=True,
            )


class DonationHistoryViewSet(viewsets.ReadOnlyModelViewSet):

    serializer_class = DonationHistorySerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return DonationHistory.objects.filter(user=self.request.user).order_by(
            "-donate_date"
        )
