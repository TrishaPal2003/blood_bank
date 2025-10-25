from rest_framework import serializers
from ..models import Account
from .location_serializer import LocationSerializer


class AccountSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField()  # returns username instead of user id
    location = LocationSerializer(read_only=True)

    class Meta:
        model = Account
        fields = [
            "id",
            "user",
            "blood_group",
            "adress",
            "last_donation_date",
            "is_available",
            "location",
        ]
