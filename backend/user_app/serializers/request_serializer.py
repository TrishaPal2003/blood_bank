
from rest_framework import serializers
from ..models.user import User




# Requester serializer
class RequesterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "email", "role", "blood_group", "date_joined"]
