from rest_framework import generics
from rest_framework.permissions import AllowAny
from ..models import Account
from ..serializers.donorability_serializer import DonorAvailabilitySerializer
from ..utils import get_available_donors
# from ..permissions import IsDonor
from ..serializers.account_serializer import AccountSerializer


class DonorListView(generics.ListAPIView):
    serializer_class = AccountSerializer
    permission_classes = [AllowAny] 

    def get_queryset(self):
        blood_group = self.request.query_params.get("blood_group")
        location = self.request.query_params.get("location")
        return get_available_donors(blood_group, location)


class DonorAvailabilityUpdateView(generics.UpdateAPIView):
    serializer_class = DonorAvailabilitySerializer
    # permission_classes = [IsAuthenticated, IsDonor]

    def get_object(self):
        return Account.objects.get(user=self.request.user)
