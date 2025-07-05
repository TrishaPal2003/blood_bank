from django.conf import settings
from django.contrib.auth.models import User
from django.core.mail import send_mail
from django.shortcuts import render
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import BloodRequest, DonationHistory
from .serializers import BloodRequestSerializer, DonationHistorySerializer

# Create your views here.


class BloodRequestView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        requests = BloodRequest.objects.all().order_by("time")
        serializer = BloodRequestSerializer(requests, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = BloodRequestSerializer(data=request.data)
        if serializer.is_valid():
            blood_request = serializer.save(user=request.user)
            users = User.objects.exclude(id=request.user.id)
            subject = f"new blood request from {request.user.username}"
            message = f"{request.user.username} requested blood group {request.user.blood_request.blood_group} at {blood_request.location} Message: {blood_request.message}"
            email_list = [user.email for user in users if user.email]

            if email_list:
                send_mail(subject,
                          message,
                          settings.DEFAULT_FROM_EMAIL,
                          email_list
                          )
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)


class DonationHistoryListCreateView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        history = DonationHistory.objects.filter(user=request.user).order_by(
            "-donate_date"
        )
        serializer = DonationHistorySerializer(history, many=True)
        return Response(serializer.data)
