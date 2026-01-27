from django.conf import settings
from django.db import models
from user_app.constant import BLOOD_GROUP_CHOICE
from user_app.models import Location
from posts_app.models import BloodRequest
from django.utils.timezone import now
from datetime import datetime




class DonationHistory(models.Model):
    donor = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="donations",
        null=True,
        blank=True
    )
    blood_request = models.ForeignKey(
        BloodRequest,
        on_delete=models.CASCADE,
        related_name="donations",
        blank=True,
        null=True
    )
    donate_date = models.DateField(default=now)
    created_at = models.DateTimeField(default=datetime.today)

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["donor", "blood_request"],
                name="one_donation_per_donor_per_request"
            )
        ]
