# Create your models here.
from django.contrib.auth.models import User
from django.db import models

from user_app.constant import BLOOD_GROUP_CHOICE
from django.utils import timezone
from datetime import timedelta




class BloodRequest(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    requester_name = models.CharField(max_length=50, blank=True, null=True)
    requester_phone_number = models.IntegerField(blank=True, null=True)
    blood_group = models.CharField(max_length=3, choices=BLOOD_GROUP_CHOICE)
    location = models.CharField(max_length=225)
    message = models.TextField()
    # latitude = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)
    # longitude = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)
    time = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.requester_name}"



class BloodPost(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    blood_group = models.CharField(max_length=3)
    message = models.TextField()
    location = models.CharField(max_length=255)
    
    created_at = models.DateTimeField(auto_now_add=True)
    request_expires_at = models.DateTimeField(default=timezone.now() + timedelta(days=2))


class DonationHistory(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    blood_group = models.CharField(max_length=3, choices=BLOOD_GROUP_CHOICE)
    location = models.CharField(max_length=225)
    donate_date = models.DateField()

    def __str__(self):
        return f"{self.user.username}"
