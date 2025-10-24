# user_app/permissions.py
from rest_framework.permissions import BasePermission

class IsAdmin(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role == 'admin'

class IsHospital(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role == 'hospital'

class IsDonor(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role == 'donor'

class IsRequester(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role == 'requester'
