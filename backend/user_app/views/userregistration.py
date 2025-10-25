from rest_framework.generics import GenericAPIView
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from ..serializers import RegistrationSerializer



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

