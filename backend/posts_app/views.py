from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.utils.timezone import now
from rest_framework.permissions import IsAuthenticated


from .models import BloodRequest, DonationHistory
from .serializers import BloodRequestSerializer, DonationHistorySerializer



from django.db import transaction
# from django.db.models import F
from django.db import IntegrityError




class BloodRequestViewSet(viewsets.ModelViewSet):
    serializer_class = BloodRequestSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # Hide closed requests
        return BloodRequest.objects.filter(status="pending")

    @transaction.atomic
    @action(detail=True, methods=["post"])
    def donate(self, request, pk=None):
        user = request.user
        blood_request = (
            BloodRequest.objects
            .select_for_update()   
            .get(pk=pk)
        )

        # Role check (intent-explicit)
        if user.role == "hospital":
            return Response(
                {"detail": "Hospitals cannot donate"},
                status=status.HTTP_403_FORBIDDEN
            )

        if blood_request.status == "closed":
            return Response(
                {"detail": "Request already closed"},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Prevent over-donation
        if blood_request.fulfilled_bags >= blood_request.required_bags:
            return Response(
                {"detail": "Required blood already collected"},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Create donation (DB enforces uniqueness)
        try:
            account = user.account
            DonationHistory.objects.create(
                donor=account,
                blood_request=blood_request,
                donate_date=now().date(),
            )
        except IntegrityError:
            return Response(
                {"detail": "You already donated to this request"},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Atomic increment
        BloodRequest.objects.filter(pk=blood_request.pk).update(
            fulfilled_bags=F("fulfilled_bags") + 1
        )

        return Response(
            {"detail": "Donation recorded"},
            status=status.HTTP_200_OK
        )

    @transaction.atomic
    @action(detail=True, methods=["post"])
    def close(self, request, pk=None):
        blood_request = (
            BloodRequest.objects
            .select_for_update()
            .get(pk=pk)
        )

        # ONLY requester can close
        if blood_request.requester != request.user.account:
            return Response(
                {"detail": "Only requester can close this request"},
                status=status.HTTP_403_FORBIDDEN
            )

        if blood_request.fulfilled_bags < blood_request.required_bags:
            return Response(
                {"detail": "Blood requirement not fulfilled yet"},
                status=status.HTTP_400_BAD_REQUEST
            )

        blood_request.status = "closed"
        blood_request.closed_at = now()
        blood_request.save()

        return Response(
            {"detail": "Blood request closed successfully"},
            status=status.HTTP_200_OK
        )



class DonationHistoryViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = DonationHistorySerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return DonationHistory.objects.filter(
            donor=self.request.user
        ).order_by("-donate_date")
