
from rest_framework import serializers
from ..models.user import User
from .account_serializer import AccountSerializer




# Donor serializer
class DonorSerializer(serializers.ModelSerializer):
    account = AccountSerializer(read_only=True)

    class Meta:
        model = User
        fields = ["id", "username", "email", "role", "account"]

