
from django.conf import settings
from django.db import models
from user_app.constant import BLOOD_GROUP_CHOICE


class DonationHistory(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    blood_group = models.CharField(max_length=3, choices=BLOOD_GROUP_CHOICE)
    location = models.CharField(max_length=225)
    donate_date = models.DateField()
