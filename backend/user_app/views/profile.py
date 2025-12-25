from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from ..serializers.account_serializer import AccountSerializer
from ..serializers.request_serializer import RequesterSerializer
from ..serializers.donor_serializer import DonorSerializer
from ..serializers.hospital_serializer import HospitalSerializer
from rest_framework.permissions import AllowAny

class UserProfileView(APIView):
    # permission_classes = [IsAuthenticated]
    permission_classes = [AllowAny]
    def get(self, request):
        user = request.user
        if user.role == "donor":
            serializer = DonorSerializer(user)
        elif user.role == "hospital":
            serializer = HospitalSerializer(user)
        elif user.role == "requester":
            serializer = RequesterSerializer(user)
        else:
            serializer = RequesterSerializer(user)  # fallback

        return Response(serializer.data)
