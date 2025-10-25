from django.contrib.auth import authenticate
from rest_framework import status
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from drf_spectacular.utils import extend_schema
from rest_framework.generics import GenericAPIView

from ..serializers import UserLoginSerializer

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
