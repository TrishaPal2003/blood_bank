from rest_framework import generics, permissions
from ..models import Location
from ..serializers.location_serializer import LocationSerializer


class LocationListView(generics.ListCreateAPIView):
    queryset = Location.objects.all().order_by("district_name")
    serializer_class = LocationSerializer
    permission_classes = [permissions.AllowAny]
