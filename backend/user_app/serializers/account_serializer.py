from rest_framework import serializers
from ..models.user import User
from ..models.accounts import Account
from ..serializers.location_serializer import LocationSerializer

# Account serializer for nested fields
class AccountSerializer(serializers.ModelSerializer):
    location = LocationSerializer(read_only=True)  # if you want location info

    class Meta:
        model = Account
        fields = ["phone", "address", "blood_group", "last_donation_date", "is_available", "location"]

# Hospital serializer with nested account
class HospitalSerializer(serializers.ModelSerializer):
    account = AccountSerializer(read_only=True)  # nest Account

    class Meta:
        model = User
        fields = ["id", "hospital_name", "email", "role", "date_joined", "account"]
