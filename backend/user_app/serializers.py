from django.contrib.auth.models import User
from rest_framework import serializers

from .constant import BLOOD_GROUP_CHOICE
from .models import Account


class RegistrationSerializer(serializers.ModelSerializer):
    confirm_password = serializers.CharField(required=True)
    blood_group = serializers.ChoiceField(choices=BLOOD_GROUP_CHOICE)

    class Meta:
        model = User
        fields = [
            "username",
            "first_name",
            "last_name",
            "email",
            "password",
            "confirm_password",
            "blood_group",
        ]

    def validate(self, data):
        if data["password"] != data["confirm_password"]:
            raise serializers.ValidationError(
                {"error": "password doesnot matched"}
                )

        if User.objects.filter(email=data["email"]).exists():
            raise serializers.ValidationError(
                {"error": "Email already exists"}
                )

        return data

    def create(self, validated_data):
        validated_data.pop("confirm_password")
        blood_group = validated_data.pop("blood_group")

        user = User.objects.create_user(**validated_data)
        if not Account.objects.filter(user=user).exists():
            Account.objects.create(user=user, blood_group=blood_group)

        return user


class UserLoginSerializer(serializers.Serializer):
    username = serializers.CharField(required=True)
    password = serializers.CharField(required=True)


class DonorSerializer(serializers.ModelSerializer):
    name = serializers.CharField(source='user.username', read_only=True)
    email = serializers.EmailField(source='user.email', read_only=True)

    class Meta:
        model = Account
        fields = "__all__"