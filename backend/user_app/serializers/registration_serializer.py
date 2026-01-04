from rest_framework import serializers
from ..models import User, Account
from ..constant import BLOOD_GROUP_CHOICE

class RegistrationSerializer(serializers.ModelSerializer):
    confirm_password = serializers.CharField(required=True)
    blood_group = serializers.ChoiceField(choices=BLOOD_GROUP_CHOICE, required=False)
    ROLE_CHOICES = ("donor", "hospital")
    role = serializers.ChoiceField(choices=ROLE_CHOICES, default="donor")

    # extra fields not in User model
    phone = serializers.CharField(required=False, allow_blank=True)
    address = serializers.CharField(required=False, allow_blank=True)
    location = serializers.IntegerField(required=False)  

    class Meta:
        model = User
        fields = [
            "username",
            "first_name",
            "last_name",
            "email",
            "password",
            "confirm_password",
            "role",
            "blood_group",  # handled manually
            "phone",        # handled manually
            "address",      # handled manually
            "location",     # handled manually
        ]

    def validate(self, data):
        if data["password"] != data["confirm_password"]:
            raise serializers.ValidationError({"error": "Password does not match"})

        if User.objects.filter(email=data["email"]).exists():
            raise serializers.ValidationError({"error": "Email already exists"})

        if data["role"] == "donor" and not data.get("blood_group"):
            raise serializers.ValidationError({"blood_group": "Blood group is required for donors"})

        return data

    def create(self, validated_data):
        # Pop extra fields
        confirm_password = validated_data.pop("confirm_password")
        blood_group = validated_data.pop("blood_group", None)
        phone = validated_data.pop("phone", "")
        address = validated_data.pop("address", "")
        location_id = validated_data.pop("location", None)
        role = validated_data.pop("role")

        # Create User
        user = User.objects.create_user(**validated_data, role=role)

        # Create Account
        from ..models.location import Location
        location = Location.objects.filter(id=location_id).first() if location_id else None

        Account.objects.create(
            user=user,
            blood_group=blood_group if role == "donor" else None,
            phone=phone,
            address=address,
            location=location
        )

        return user
