from rest_framework import generics
from ..models import Location
from ..serializers import LocationSerializer



class LocationListView(generics.ListAPIView):
    queryset = Location.objects.all().order_by("district_name")
    serializer_class = LocationSerializer
