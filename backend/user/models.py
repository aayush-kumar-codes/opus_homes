from django.db import models
from django.contrib.auth.models import AbstractBaseUser


class User(AbstractBaseUser):
    ROLES = (
        (1, 'Admin'),
        (2, 'Superintendent'),
        (3, 'Sales Associate')
    )
    role = models.SmallIntegerField(choices=ROLES)
    email = models.CharField(max_length=50, unique=True)
    password = models.CharField(max_length=250)
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    is_staff = models.BooleanField(default=False)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['role']
   