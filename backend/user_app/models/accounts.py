from django.db import models
from datetime import date, timedelta

from .user import User
from .location import Location


class Account(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)

    address = models.TextField(null=True, blank=True)
    blood_group = models.CharField(max_length=5, null=True, blank=True)
    last_donation_date = models.DateField(null=True, blank=True)

    is_available = models.BooleanField(default=False)

    location = models.ForeignKey(
        Location, on_delete=models.SET_NULL, null=True, blank=True
    )

    def save(self, *args, **kwargs):
        if self.last_donation_date:
            cooldown_end = date.today() - timedelta(days=90)
            if self.last_donation_date > cooldown_end:
                self.is_available = False
            else:
                self.is_available = True

        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.user.username} - {self.blood_group} - {'Available' if self.is_available else 'Unavailable'}"
