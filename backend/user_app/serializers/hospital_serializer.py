

from rest_framework import serializers
from ..models.user import User


# Hospital serializer
class HospitalSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "hospital_name", "email", "phone", "address", "role", "date_joined"]
