from django.db import models

from user.models import User

class CRM(models.Model):
    Home_intrested = (
        (1, 'Flat'),
        (2, 'Duplex'),
        (3, 'House')
    )

    Size_choices = (
        (1, '1000 sq.ft'),
        (2, '1200 sq.ft'),
        (3, '1500 sq.ft'),
        (4, '2000 sq.ft')
    )

    financing_choices = (
        (1, 'Credit Card'),
        (2, 'Netbanking'),
        (3, 'Online')
    )

    HERO_CHOICES = [
    ('NONE', 'None'),
    ('VETERAN', 'Veteran'),
    ('TEACHER', 'Teacher'),
    ('FIRST_RESPONDER', 'First Responder'),
    ('MEDICAL_PROFESSIONAL', 'Medical Professional'),
]
    
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    email = models.CharField(max_length=50)
    phone = models.CharField(max_length=20)
    date = models.DateField()
    time_frame = models.CharField(max_length=50)
    home_interested_in = models.SmallIntegerField(choices=Home_intrested)
    Size_of_home = models.SmallIntegerField(choices=Size_choices)
    financing_option = models.SmallIntegerField(choices=financing_choices)
    hero = models.CharField(max_length=30, choices=HERO_CHOICES)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='crm')