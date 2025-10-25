
from rest_framework.response import Response
from ..constant import BLOOD_GROUP_CHOICE
from rest_framework.generics import GenericAPIView


class BloodGroupList(GenericAPIView):
    def get(self, request):
        return Response([group[0] for group in BLOOD_GROUP_CHOICE])
