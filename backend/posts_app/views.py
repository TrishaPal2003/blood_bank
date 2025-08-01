from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from django.contrib.auth.models import User
from django.core.mail import send_mail
from django.conf import settings

from .models import BloodRequest, DonationHistory, BloodPost
from .serializers import BloodRequestSerializer, DonationHistorySerializer, BloodPostSerializer

from django.utils import timezone
from rest_framework.decorators import action
from rest_framework.response import Response
from datetime import timedelta



class BloodRequestViewSet(viewsets.ModelViewSet):
   
    queryset = BloodRequest.objects.select_related("user").all().order_by("-time")
    serializer_class = BloodRequestSerializer
    permission_classes = [permissions.IsAuthenticated]
   
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        blood_request = serializer.save(user=request.user)

        users = User.objects.exclude(id=request.user.id).exclude(email="")
        subject = f"New blood request from {blood_request.requester_name}"
        message = (
        f"{blood_request.requester_name} requested blood group "
        f"{blood_request.blood_group} at {blood_request.location}. "
        f"Message: {blood_request.message}"
        )

        send_mail(subject, message, settings.DEFAULT_FROM_EMAIL,
                  [u.email for u in users])

        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

def create(self, request, *args, **kwargs):
    serializer = self.get_serializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    
    # Save BloodRequest object first
    blood_request = serializer.save(user=request.user)

    # 🔥 Create a BloodPost from the BloodRequest
    BloodPost.objects.create(
        user=request.user,
        blood_group=blood_request.blood_group,
        message=blood_request.message,
        location=blood_request.location,
        request_expires_at=timezone.now() + timedelta(days=2)
    )

    headers = self.get_success_headers(serializer.data)
    return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

class DonationHistoryViewSet(viewsets.ReadOnlyModelViewSet):
    
    serializer_class = DonationHistorySerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return DonationHistory.objects.filter(user=self.request.user).order_by("-donate_date")
