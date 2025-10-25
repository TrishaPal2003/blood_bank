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

    # Optional email verification
    is_email_verified = models.BooleanField(default=False)

    def __str__(self):
        return self.username