from django.urls import path

from .views import (Register, Login, UserDetails,)


urlpatterns = [
    path("register/", Register.as_view(), name='register'),
    path("login/", Login.as_view(), name='login'),
    path("profile/", UserDetails.as_view(), name='profile'),
]
