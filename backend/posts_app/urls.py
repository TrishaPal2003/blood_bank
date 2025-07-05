from django.urls import path

from . import views

urlpatterns = [
    path("post/", views.BloodRequestView.as_view(), name="bloodrequestpost"),
    path(
        "history/",
        views.DonationHistoryListCreateView.as_view(),
        name="donationhistory",
    ),
]
