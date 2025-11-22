from ..models import Account
from rest_framework import serializers


class DonorAvailabilitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = ["is_available"]

    def update(self, instance, validated_data):
        instance.is_available = validated_data.get(
            "is_available", instance.is_available
        )
        instance.save()
        return instance
