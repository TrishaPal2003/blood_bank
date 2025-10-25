from ..models import Account
from rest_framework import serializers



class DonorSerializer(serializers.ModelSerializer):
    name = serializers.CharField(source="user.username", read_only=True)
    email = serializers.EmailField(source="user.email", read_only=True)

    class Meta:
        model = Account
        fields = "__all__"