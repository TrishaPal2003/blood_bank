from django.conf import settings
from django.db import models
from user_app.models import Location
from user_app.constant import BLOOD_GROUP_CHOICE


class BloodRequest(models.Model):
    hospital = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        limit_choices_to={"role": "hospital"},
        null=True,  
        blank=True,
    )
    blood_group = models.CharField(max_length=3, choices=BLOOD_GROUP_CHOICE)
    location = models.ForeignKey(Location, on_delete=models.SET_NULL, null=True)
    message = models.TextField()
    status = models.CharField(
        max_length=20,
        choices=[
            ("pending", "Pending"),
            ("approved", "Approved"),
            ("rejected", "Rejected"),
            ("fulfilled", "Fulfilled"),
        ],
        default="pending",
    )
    created_at = models.DateTimeField(auto_now_add=True)
    bag_number = models.IntegerField(default=0)

    def __str__(self):
        return f"{self.hospital.username if self.hospital else 'Unknown'} - {self.blood_group} - {self.status}"