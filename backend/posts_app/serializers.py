from rest_framework import serializers

from .models import BloodRequest, DonationHistory


class BloodRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = BloodRequest
        fields = "__all__"
        read_only_fields = ["hospital", "status", "created_at"]

    def create(self, validated_data):
        # Auto-assign hospital from request.user
        validated_data["hospital"] = self.context["request"].user
        return super().create(validated_data)


class DonationHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = DonationHistory
        fields = "__all__"
        read_only_fields = ["user"]
