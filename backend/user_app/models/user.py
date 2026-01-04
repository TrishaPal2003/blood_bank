from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    ROLE_CHOICES = (
        ("admin", "Admin"),
        ("hospital", "Hospital"),
        ("donor", "Donor"),
    )

    role = models.CharField(
        max_length=20,
        choices=ROLE_CHOICES,
        default="donor"
    )

    # Hospital-only field
    hospital_name = models.CharField(max_length=255, null=True, blank=True)

    # Security
    is_email_verified = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.username} ({self.role})"
