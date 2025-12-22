from rest_framework import serializers
from ..models.user import User
from ..models.accounts import Account
from ..serializers.location_serializer import LocationSerializer


class AccountSerializer(serializers.ModelSerializer):
    location = LocationSerializer(read_only=True)

    class Meta:
        model = Account
        fields = ["address", "blood_group", "last_donation_date", "is_available", "location"]


class UserSerializerPublic(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "email", "role"]
