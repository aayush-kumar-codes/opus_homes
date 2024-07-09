from rest_framework import serializers

from .models import CRM 


class CRMSerializer(serializers.ModelSerializer):
    class Meta:
        model = CRM
        exclude = ('user',)