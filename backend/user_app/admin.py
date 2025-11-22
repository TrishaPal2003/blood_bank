from django.contrib import admin

# Register your models here.
from .models import Account, Location, User

admin.site.register(Account)
admin.site.register(Location)
admin.site.register(User)
