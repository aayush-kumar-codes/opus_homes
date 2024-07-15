from django.db import models

from user.models import User


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
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='job_entries')


class JobEntryDetails(models.Model):
    Status = (
        (0, "Not Complete"),
        (1, "Complete"),
    )

    Paid = (
        (0, 'No'),
        (1, 'Yes')
    )

    Payment_Type=(
        (1, 'Cheque'),
        (2, 'CC')
    )
    items = models.CharField(max_length=50)
    status = models.SmallIntegerField(choices=Status, default=0)
    cost = models.IntegerField(default=0)
    paid = models.SmallIntegerField(choices=Paid, default=0)
    payment_type = models.SmallIntegerField(choices=Payment_Type, null=True)
    Sub_Contractor = models.CharField(max_length=50, null=True)
    job = models.ForeignKey(JobEntry, on_delete=models.CASCADE, related_name="job_details")


class JobentryDetailsRecord(models.Model):
    completed_items = models.IntegerField(default=0)
    uncompleted_items = models.IntegerField(default=0)
    completed_items_paid = models.IntegerField(default=0)
    completed_items_unpaid = models.IntegerField(default=0)
    payment_owed = models.IntegerField(default=0)
    Total_paid = models.IntegerField(default=0)
    job = models.OneToOneField(JobEntry, on_delete=models.CASCADE, related_name="records")