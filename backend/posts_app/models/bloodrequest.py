from django.db import models
from django.utils import timezone
from user_app.models import Account, Location
from user_app.constant import BLOOD_GROUP_CHOICE


class BloodRequest(models.Model):
    # Optional: who created the request (logged-in user)
    requester = models.ForeignKey(
    Account,
    on_delete=models.CASCADE,
    null=True,
    blank=True,
    related_name="blood_requests",
    )

    # Snapshot contact info
    requester_name = models.CharField(
    max_length=100,
    null=True,
    blank=True,
)

    requester_phone = models.CharField(
        max_length=20,
        null=True,
        blank=True,
    )


    # Request details
    blood_group = models.CharField(
    max_length=5,
    choices=BLOOD_GROUP_CHOICE,
    null=True,
    blank=True,
    )

    location = models.ForeignKey(
        Location,
        on_delete=models.CASCADE,
        null=True,
        blank=True,
    )

    required_bags = models.PositiveIntegerField()
    fulfilled_bags = models.PositiveIntegerField(default=0)

    message = models.TextField(blank=True)

    status = models.CharField(
        max_length=20,
        choices=[
            ("pending", "Pending"),
            ("closed", "Closed"),
        ],
        default="pending",
    )

    closed_at = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(default=timezone.now)

    def close(self):
        self.status = "closed"
        self.closed_at = timezone.now()
        self.save(update_fields=["status", "closed_at"])

    def __str__(self):
        return f"{self.blood_group} | {self.required_bags} bags | {self.status}"
