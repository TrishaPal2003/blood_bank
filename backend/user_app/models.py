from django.contrib.auth.models import User
from django.db import models

from .constant import BLOOD_GROUP_CHOICE


class Account(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    adress = models.TextField(null=True, blank=True)
    blood_group = models.CharField(max_length=3, choices=BLOOD_GROUP_CHOICE)
    last_donation_date = models.DateField(null=True, blank=True)
    is_available = models.BooleanField(default=True)

    def __str__(self):
        return self.user.username
