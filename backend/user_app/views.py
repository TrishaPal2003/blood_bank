from django.contrib.auth import authenticate, get_user_model, logout
from django.contrib.auth.tokens import default_token_generator
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
from django.utils.encoding import force_bytes
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode
from rest_framework import status, generics
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from rest_framework_simplejwt.tokens import RefreshToken
from drf_spectacular.utils import extend_schema
from rest_framework.generics import GenericAPIView
from django.utils.encoding import force_bytes, force_str
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from .permissions import IsAdmin, IsHospital, IsDonor, IsRequester
from .serializers import DonorAvailabilitySerializer
from .utils import get_available_donors
from rest_framework.permissions import AllowAny
from .serializers import EmailVerificationSerializer


from .models import Account, Location
from .serializers import (
    AccountSerializer,
    LocationSerializer,
    DonorSerializer,
    RegistrationSerializer,
    UserLoginSerializer,
    LogoutSerializer,
)
from .constant import BLOOD_GROUP_CHOICE


User = get_user_model()


# ------------------------------
# BLOOD GROUPS, LOCATIONS, DONORS
# ------------------------------


class BloodGroupList(GenericAPIView):
    def get(self, request):
        return Response([group[0] for group in BLOOD_GROUP_CHOICE])


class LocationListView(generics.ListAPIView):
    queryset = Location.objects.all().order_by("district_name")
    serializer_class = LocationSerializer


class DonorListView(generics.ListAPIView):
    serializer_class = AccountSerializer

    def get_queryset(self):
        blood_group = self.request.query_params.get("blood_group")
        location = self.request.query_params.get("location")
        return get_available_donors(blood_group, location)


# ------------------------------
# USER REGISTRATION
# ------------------------------


class UserRegistratioApiView(GenericAPIView):
    serializer_class = RegistrationSerializer
    permission_classes = [AllowAny]  

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            user.is_active = True  
            user.save()
            return Response(
                {
                    "message": "User registered successfully.",
                    "user_id": user.id,
                    "role": user.role,
                },
                status=status.HTTP_201_CREATED,
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class SendVerificationEmailApiView(APIView):
    permission_classes = [AllowAny]

    @extend_schema(request=EmailVerificationSerializer, responses={200: dict})
    def post(self, request):
        serializer = EmailVerificationSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=400)

        email = serializer.validated_data["email"]

        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response(
                {"message": "No user found with this email."}, status=404
            )

        if user.is_email_verified:
            return Response({"message": "Email is already verified."}, status=200)

        # Generate token and send email
        token = default_token_generator.make_token(user)
        uid = urlsafe_base64_encode(force_bytes(user.pk))
        confirm_link = f"http://127.0.0.1:8000/api/users/verify-email/{uid}/{token}/"

        email_subject = "Verify your email"
        email_body = render_to_string(
            "confirm_email.html", {"confirm_link": confirm_link}
        )

        try:
            email_msg = EmailMultiAlternatives(email_subject, "", to=[user.email])
            email_msg.attach_alternative(email_body, "text/html")
            email_msg.send()
            return Response(
                {"message": "Verification email sent successfully."}, status=200
            )
        except Exception as e:
            print("Email send failed:", e)
            return Response({"message": "Failed to send email."}, status=500)


class VerifyEmailApiView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, uidb64, token):
        try:
            uid = force_str(urlsafe_base64_decode(uidb64))
            user = User.objects.get(pk=uid)
        except (TypeError, ValueError, OverflowError, User.DoesNotExist):
            user = None

        if user and default_token_generator.check_token(user, token):
            user.is_email_verified = True
            user.save()
            return Response({"message": "Email verified successfully!"}, status=200)
        else:
            return Response(
                {"message": "Invalid or expired verification link."}, status=400
            )


# ------------------------------
# LOGIN + LOGOUT
# ------------------------------


@extend_schema(request=UserLoginSerializer)
class UserLogin(GenericAPIView):
    serializer_class = UserLoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)

        username = serializer.validated_data["username"]
        password = serializer.validated_data["password"]
        user = authenticate(username=username, password=password)

        if not user:
            return Response(
                {"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED
            )

        token, created = Token.objects.get_or_create(user=user)
        return Response({"token": token.key, "user_id": user.id, "role": user.role})


@permission_classes([IsAuthenticated])
class LogoutView(GenericAPIView):
    serializer_class = LogoutSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)

        try:
            refresh_token = serializer.validated_data["refresh"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response({"message": "Logout successful"}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(
                {"error": f"Invalid token: {e}"}, status=status.HTTP_400_BAD_REQUEST
            )


# ------------------------------
# DASHBOARD VIEWS
# ------------------------------


class AdminDashboardView(APIView):
    permission_classes = [IsAuthenticated, IsAdmin]

    def get(self, request):
        return Response({"message": "Welcome Admin!", "user_id": request.user.id})


class HospitalDashboardView(APIView):
    permission_classes = [IsAuthenticated, IsHospital]

    def get(self, request):
        return Response({"message": "Welcome Hospital!", "user_id": request.user.id})


class DonorDashboardView(APIView):
    permission_classes = [IsAuthenticated, IsDonor]

    def get(self, request):
        return Response({"message": "Welcome Donor!", "user_id": request.user.id})


class RequesterDashboardView(APIView):
    permission_classes = [IsAuthenticated, IsRequester]

    def get(self, request):
        return Response({"message": "Welcome Requester!", "user_id": request.user.id})


class DonorAvailabilityUpdateView(generics.UpdateAPIView):
    serializer_class = DonorAvailabilitySerializer
    permission_classes = [IsAuthenticated, IsDonor]

    def get_object(self):
        return Account.objects.get(user=self.request.user)
