from rest_framework import serializers
from .models import CRM 

class CRMSerializer(serializers.ModelSerializer):
    class Meta:
        model = CRM
        fields = ['first_name','last_name','email','phone','date',
                'time_frame','home_interested_in',
                'Size_of_home','financing_option','hero']