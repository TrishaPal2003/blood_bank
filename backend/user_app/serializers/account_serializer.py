from rest_framework import serializers
from ..models import Account, User
from .location_serializer import LocationSerializer

class UserSerializer1(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = "__all__"

class AccountSerializer(serializers.ModelSerializer):
    # user = serializers.StringRelatedField() 
    user = UserSerializer1()
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
