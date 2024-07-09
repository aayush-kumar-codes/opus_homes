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


class JobEntry(models.Model):
    MODEL = (
        (1, '1634'),
        (2, '1845'),
        (3, '2234'),
        (4, '2603'),
        (5, 'custom'),
    )

    CONTRACT_TYPE = (
        (1, 'construction_loan'),
        (2, 'Cash'),
        (3, 'Deed_over'),
    )

    
    job_id = models.IntegerField()
    owner_id = models.IntegerField()
    job_name = models.CharField(max_length=50)
    job_address = models.CharField(max_length=255)
    job_model = models.SmallIntegerField(choices=MODEL)
    contract_type = models.SmallIntegerField(choices=CONTRACT_TYPE)
    contract_price = models.DecimalField(max_digits=10, decimal_places=2)
    projected_start_date = models.DateField()
    projected_completed_date = models.DateField()
    permit_municipalities = models.CharField(max_length=255)
    owner_first_name = models.CharField(max_length=50)
    owner_last_name = models.CharField(max_length=50)
    owner_current_address = models.CharField(max_length=255)
    owner_phone_number = models.CharField(max_length=15)
    owner_email = models.EmailField()
    living_sqft = models.IntegerField()
    total_sqft = models.IntegerField()