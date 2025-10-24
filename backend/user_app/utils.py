from datetime import date, timedelta
from user_app.models import Account

def get_available_donors(blood_group=None, location=None):
    """
    Return donors who are available, match blood group & location,
    and last donation was at least 90 days ago.
    """
    cutoff = date.today() - timedelta(days=90)
    qs = Account.objects.filter(
        is_available=True,
        donationhistory__donate_date__lte=cutoff
    ).distinct()

    if blood_group:
        qs = qs.filter(blood_group=blood_group)
    if location:
        qs = qs.filter(location=location)

    return qs
