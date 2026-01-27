from rest_framework import serializers
from .models import BloodRequest, DonationHistory

from rest_framework import serializers
from .models import BloodRequest


class BloodRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = BloodRequest
        fields = "__all__"
        read_only_fields = [
            "requester",
            "fulfilled_bags",
            "status",
            "closed_at",
            "created_at",
        ]

    def validate_required_bags(self, value):
        if value <= 0:
            raise serializers.ValidationError("Required bags must be at least 1.")
        return value

    def create(self, validated_data):
        request = self.context.get("request")

        # Attach requester if authenticated
        if request and request.user.is_authenticated:
            validated_data["requester"] = getattr(
                request.user, "account", None
            )

        return super().create(validated_data)





class DonationHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = DonationHistory
        fields = "__all__"
        read_only_fields = ["donor", "created_at"]
