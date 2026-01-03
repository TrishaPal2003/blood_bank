from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from ..permissions import IsAdmin, IsHospital, IsDonor, IsRequester


class DashboardView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        data = {
            "user": {
                "id": user.id,
                "name": user.get_full_name() or user.username,
                "bloodGroup": getattr(user, "blood_group", None),
                "location": getattr(user, "location", None),
                "isHospital": getattr(user, "is_hospital", False),
                "isAdmin": user.is_staff,  # or your admin flag
            },
            "canDonate": False,
            "hasActiveRequest": False,
            "activeRequests": [],
            "matchingRequests": [],
            "stats": {
                "totalDonations": 0,
                "totalRequests": 0
            }
        }

        # ---------- Role-specific logic ----------
        if getattr(user, "is_hospital", False):
            # hospital specific stats
            data["stats"]["totalRequests"] = 42  # example
            data["activeRequests"] = []  # you can fetch hospital requests here

        elif getattr(user, "is_admin", False) or user.is_staff:
            data["stats"]["totalRequests"] = 100  # admin overview
            data["stats"]["totalDonations"] = 50

        else:
            # Donor/Requester logic (combined)
            data["canDonate"] = True  # you can compute eligibility
            data["hasActiveRequest"] = True  # compute from user requests
            data["activeRequests"] = []  # query their active requests
            data["matchingRequests"] = []  # query matching requests
            data["stats"]["totalDonations"] = 3
            data["stats"]["totalRequests"] = 2

        return Response(data)