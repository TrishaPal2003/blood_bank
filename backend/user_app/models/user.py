from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    ROLE_CHOICES = (
        ("admin", "Admin"),
        ("hospital", "Hospital"),
        ("donor", "Donor"),
        ("requester", "Requester"),
    )

    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default="requester")

    # Hospital-specific fields
    hospital_name = models.CharField(max_length=255, null=True, blank=True)
    phone = models.CharField(max_length=20, null=True, blank=True)
    address = models.TextField(null=True, blank=True)

    
    blood_group = models.CharField(max_length=5, blank=True, null=True)

    # Optional email verification
    is_email_verified = models.BooleanField(default=False)

    def __str__(self):
        return self.username
