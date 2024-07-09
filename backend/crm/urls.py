from django.urls import path

from .views import CustomerRelation, ManageCrmRecords


urlpatterns = [
    path("crm/", CustomerRelation.as_view(), name='crm'),
    path("records_crm/", ManageCrmRecords.as_view(), name='recors-crm'),
    path("records_crm/<int:id>/", ManageCrmRecords.as_view(), name='recors-crm-by-id'),
]

