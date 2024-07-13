from django.urls import path

from .views import (AdminForm, GettingJobEntryDetails)


urlpatterns = [
    path("", AdminForm.as_view(), name='admin_form'),
    path("<int:job_id>/", AdminForm.as_view(), name='admin_form_details'),
    path("entries/<int:job_id>/", GettingJobEntryDetails.as_view(), name='admin_form_entries'),
    path("entries/<int:job_id>/<int:item_id>/", GettingJobEntryDetails.as_view(), name='admin_form_entries')
]
