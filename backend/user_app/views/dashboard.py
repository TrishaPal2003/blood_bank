from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response


class DashboardView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user

        if user.role == "admin":
            data = {
                "role": "admin",
                "message": "Welcome Admin",
                "controls": ["users", "hospitals", "reports"],
            }

        elif user.role == "hospital":
            data = {
                "role": "hospital",
                "message": "Welcome Hospital",
                "controls": ["create_request", "view_requests"],
            }

        elif user.role == "donor":
            data = {
                "role": "donor",
                "message": "Welcome Donor",
                "controls": ["donate_blood", "request_blood"],
            }

        else:
            return Response(
                {"error": "Invalid role"},
                status=400
            )

        return Response({
            "user_id": user.id,
            "dashboard": data
        })
