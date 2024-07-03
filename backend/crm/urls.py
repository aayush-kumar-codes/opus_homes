from django.urls import path
from .views import CustomerRelation

urlpatterns = [
    path("crm/", CustomerRelation.as_view(), name='crm'),
]
