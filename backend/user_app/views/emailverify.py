from django.contrib.auth import get_user_model
from django.contrib.auth.tokens import default_token_generator
from django.utils.encoding import force_str
from django.utils.http import urlsafe_base64_decode
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny


User = get_user_model()

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
