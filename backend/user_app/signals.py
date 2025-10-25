from django.contrib.auth.models import User
from django.db.models.signals import post_save

from .model import Account


def create_donner_profile(sender, instance, created, **kwargs):
    if created:
        Account.objects.create(user=instance)


post_save.connect(create_donner_profile, sender=User)
