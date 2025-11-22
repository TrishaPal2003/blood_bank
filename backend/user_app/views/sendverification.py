from django.contrib.auth import get_user_model
from django.contrib.auth.tokens import default_token_generator
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
from django.utils.encoding import force_bytes, force_str
from django.utils.http import urlsafe_base64_encode
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from drf_spectacular.utils import extend_schema
from ..serializers.account_serializer import AccountSerializer

User = get_user_model()


class SendVerificationEmailApiView(APIView):
    permission_classes = [AllowAny]

    @extend_schema(request=AccountSerializer, responses={200: dict})
    def post(self, request):
        serializer = AccountSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=400)

        email = serializer.validated_data["email"]

        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response({"message": "No user found with this email."}, status=404)

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
