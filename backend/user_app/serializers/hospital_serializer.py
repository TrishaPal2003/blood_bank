from rest_framework import serializers
from ..models.user import User
from .account_serializer import AccountSerializer  # nested

class HospitalSerializer(serializers.ModelSerializer):
    account = AccountSerializer(read_only=True)  # nest Account

    class Meta:
        model = User
        fields = ["id", "hospital_name", "email", "role", "date_joined", "account"]
