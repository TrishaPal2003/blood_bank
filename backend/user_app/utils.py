from datetime import date, timedelta
from user_app.models import Account


def get_available_donors(blood_group=None, location=None):
    """
    Default: return ALL donors.
    Apply filters ONLY if frontend sends them.
    """
    qs = Account.objects.select_related("user", "location")

    if blood_group:
        qs = qs.filter(blood_group=blood_group)

    if location:
        qs = qs.filter(location_id=location)

    return qs
