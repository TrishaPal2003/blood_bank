from django.contrib import admin

# Register your models here.
from .models import BloodRequest, DonationHistory

admin.site.register(BloodRequest)
admin.site.register(DonationHistory)
