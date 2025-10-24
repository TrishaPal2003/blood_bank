from django.contrib.auth.models import AbstractUser
from django.db import models
from django.conf import settings
from datetime import date, timedelta



from .constant import BLOOD_GROUP_CHOICE

class User(AbstractUser):
    ROLE_CHOICES = (
        ('admin', 'Admin'),
        ('hospital', 'Hospital'),
        ('donor', 'Donor'),
        ('requester', 'Requester'),
    )

    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='requester')

    # ✅ Optional email verification flag
    is_email_verified = models.BooleanField(default=False)

    def __str__(self):
        return self.username
    
class Location(models.Model):
    district_name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.district_name

class Account(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    adress = models.TextField(null=True, blank=True)
    blood_group = models.CharField(max_length=3, choices=BLOOD_GROUP_CHOICE)
    last_donation_date = models.DateField(null=True, blank=True)
    is_available = models.BooleanField(default=False)
    location = models.ForeignKey(Location, on_delete=models.SET_NULL, null=True, blank=True)

    def save(self, *args, **kwargs):
        # Auto-disable if last donation < 90 days ago
        if self.last_donation_date:
            cutoff = date.today() - timedelta(days=90)
            if self.last_donation_date > cutoff:
                self.is_available = False
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.user.username} - {self.blood_group} - {'Available' if self.is_available else 'Unavailable'}"