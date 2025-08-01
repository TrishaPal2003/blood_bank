from rest_framework import serializers

from .models import BloodRequest, DonationHistory,BloodPost


class BloodRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = BloodRequest
        fields = "__all__"

class BloodPostSerializer(serializers.ModelSerializer):

    class Meta:
        model = BloodPost
        fields = ['id', 'user', 'blood_group', 'message', 'location', 'created_at', 'request_expires_at']
        read_only_fields = ['created_at']

class DonationHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = DonationHistory
        fields = "__all__"
