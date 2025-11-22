from ..models import Location
from rest_framework import serializers
from ..constant import BLOOD_GROUP_CHOICE


class LocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Location
        fields = ["id", "district_name"]
