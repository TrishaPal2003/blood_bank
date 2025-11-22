from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from google.oauth2 import id_token
from google.auth.transport import requests
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.tokens import RefreshToken

User = get_user_model()

class GoogleLoginView(APIView):
    authentication_classes = []  # No JWT required
    permission_classes = []      # Public endpoint

    def post(self, request):
        token = request.data.get("token")

        if not token:
            return Response({"error": "Token is required"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            # Verify Google token
            idinfo = id_token.verify_oauth2_token(token, requests.Request())

            email = idinfo.get("email")
            name = idinfo.get("name", email.split("@")[0])

            if not email:
                return Response({"error": "Invalid Google token"}, status=status.HTTP_400_BAD_REQUEST)

            # Create or get user
            user, created = User.objects.get_or_create(
                username=email,
                defaults={"email": email, "first_name": name},
            )

            # Issue JWT tokens
            refresh = RefreshToken.for_user(user)
            access = refresh.access_token

            return Response({
                "access": str(access),
                "refresh": str(refresh),
                "email": email,
                "name": name,
            })

        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
