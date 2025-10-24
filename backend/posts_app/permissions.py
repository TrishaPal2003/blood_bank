from rest_framework.permissions import BasePermission, SAFE_METHODS

class IsHospitalOrReadOnly(BasePermission):
    def has_permission(self, request, view):
        # GET is allowed for everyone authenticated
        if request.method in SAFE_METHODS:
            return request.user.is_authenticated
        # POST only allowed for hospital
        return request.user.is_authenticated and request.user.role == 'hospital'

class IsAdminForStatusChange(BasePermission):
    def has_permission(self, request, view):
        # PATCH only allowed for admin
        if request.method == 'PATCH':
            return request.user.is_authenticated and request.user.role == 'admin'
        return True
