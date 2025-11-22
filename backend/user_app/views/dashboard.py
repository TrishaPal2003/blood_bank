from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from ..permissions import IsAdmin, IsHospital, IsDonor, IsRequester


class AdminDashboardView(APIView):
    permission_classes = [IsAuthenticated, IsAdmin]

    def get(self, request):
        return Response({"message": "Welcome Admin!", "user_id": request.user.id})


class HospitalDashboardView(APIView):
    permission_classes = [IsAuthenticated, IsHospital]

    def get(self, request):
        return Response({"message": "Welcome Hospital!", "user_id": request.user.id})


class DonorDashboardView(APIView):
    permission_classes = [IsAuthenticated, IsDonor]

    def get(self, request):
        return Response({"message": "Welcome Donor!", "user_id": request.user.id})


class RequesterDashboardView(APIView):
    permission_classes = [IsAuthenticated, IsRequester]

    def get(self, request):
        return Response({"message": "Welcome Requester!", "user_id": request.user.id})
