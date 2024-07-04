from django.urls import path
from .views import Register, Login, UserDetailsView


urlpatterns = [
    path("register/", Register.as_view(), name='register'),
    path("login/", Login.as_view(), name='login'),
    path("profile/", UserDetailsView.as_view(), name='profile')
]
