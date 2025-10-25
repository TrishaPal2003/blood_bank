from .model import User, Account, Location
from rest_framework import serializers
from .constant import BLOOD_GROUP_CHOICE



class LocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Location
        fields = ["id", "district_name"]


class AccountSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField()  # returns username instead of user id
    location = LocationSerializer(read_only=True)

    class Meta:
        model = Account
        fields = [
            "id",
            "user",
            "blood_group",
            "adress",
            "last_donation_date",
            "is_available",
            "location",
        ]


class RegistrationSerializer(serializers.ModelSerializer):
    confirm_password = serializers.CharField(required=True)
    blood_group = serializers.ChoiceField(choices=BLOOD_GROUP_CHOICE)
    ROLE_CHOICES = ("donor", "hospital", "requester")  # Admin not self-assignable
    role = serializers.ChoiceField(choices=ROLE_CHOICES, default="requester")

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
            "role",
        ]

    def validate(self, data):
        # Password match
        if data["password"] != data["confirm_password"]:
            raise serializers.ValidationError({"error": "Password does not match"})

        # Email uniqueness
        if User.objects.filter(email=data["email"]).exists():
            raise serializers.ValidationError({"error": "Email already exists"})

        # Optional: extra role validation
        if data["role"] not in self.ROLE_CHOICES:
            raise serializers.ValidationError({"error": "Invalid role selected"})

        return data

    def create(self, validated_data):
        # Remove fields not needed for User model
        validated_data.pop("confirm_password")
        blood_group = validated_data.pop("blood_group")
        role = validated_data.pop("role")

        # Create the user with role
        user = User.objects.create_user(**validated_data, role=role)

        # Create Account only for donor, hospital, or requester
        if role in ["donor", "hospital", "requester"]:
            Account.objects.create(user=user, blood_group=blood_group)

        return user


class EmailVerificationSerializer(serializers.Serializer):
    email = serializers.EmailField()


class UserLoginSerializer(serializers.Serializer):
    username = serializers.CharField(required=True)
    password = serializers.CharField(required=True)


class LogoutSerializer(serializers.Serializer):
    refresh = serializers.CharField(
        help_text="Refresh token to blacklist during logout"
    )


class DonorSerializer(serializers.ModelSerializer):
    name = serializers.CharField(source="user.username", read_only=True)
    email = serializers.EmailField(source="user.email", read_only=True)

    class Meta:
        model = Account
        fields = "__all__"


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
