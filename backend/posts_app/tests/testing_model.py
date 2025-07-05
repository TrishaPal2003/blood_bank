from django.test import TestCase
from django.contrib.auth.models import User
from ..models import BloodRequest,DonationHistory


class TestBloodRequestModel(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username="trisha", password="12345main")



    def test_str_returns_username(self):
        req = BloodRequest.objects.create(
            user = self.user,
            blood_group = "B+",
            location = "Apallo hospital dhaka",
            message = "need blood urgently",
        )
        self.assertEqual(str(req),"trisha")

    def test_time_is_auto_set(self):
        req = BloodRequest.objects.create(
            user = self.user,
            blood_group = "B+",
            location = "Apallo hospital dhaka",
            message = "need blood urgently",
        )
        self.assertIsNotNone(req.time)


    def test_valid_blood_group_choice(self):
        req = BloodRequest.objects.create(
            user = self.user,
            blood_group = "B+",
            location = "Apallo hospital dhaka",
            message = "need blood urgently",
        )
        from ..models import BLOOD_GROUP_CHOICE
        self.assertIn(req.blood_group,dict(BLOOD_GROUP_CHOICE))


class TestDonationHistroyModel(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username="trisha", password="12345main")


    def test_str_returns_username(self):
        req = DonationHistory.objects.create(
            user = self.user,
            blood_group = "B+",
            location = "Appalo hospital dhaka",

        )
        self.assertEqual(str(req),"trisha")

    