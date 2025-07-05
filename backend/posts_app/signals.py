from django.db.models.signals import post_save
from django.dispatch import receiver
from django.utils.timezone import now

from posts_app.models import BloodRequest, DonationHistory


@receiver(post_save, sender=BloodRequest)
def create_donation_history(sender, instance, created, **kwargs):
    if created:
        DonationHistory.objects.create(
            user=instance.user,
            donate_date=now().date(),
            blood_group=instance.blood_group,
            location=instance.location,
        )
