from rest_framework import generics
from ..models import Location
from ..serializers.location_serializer import LocationSerializer
from rest_framework.permissions import AllowAny

class LocationListView(generics.ListCreateAPIView):
    queryset = Location.objects.all().order_by("district_name")
    serializer_class = LocationSerializer
    permission_classes = [AllowAny]
    authentication_classes = []  # <--- This disables JWT auth for this endpoint
