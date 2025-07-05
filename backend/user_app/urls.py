from django.urls import include, path
from rest_framework.routers import DefaultRouter

from . import views

router = DefaultRouter()

# router.register('donnors',views.DonnerViewset)
urlpatterns = [
    path("", include(router.urls)),
    
    path(
        "register/",
        views.UserRegistratioApiView.as_view(),
        name="register"
        ),

    path("login/", views.UserLogin.as_view(), name="login"),
    path("logout/", views.UserLogout.as_view(), name="logout"),
    path("active/<uid64>/<token>/", views.activate, name="activate"),
]
