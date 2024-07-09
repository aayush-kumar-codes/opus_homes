import random

from rest_framework import serializers
from .models import User, JobEntry


class RegisterSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = "__all__"

    def create(self, validated_data):
        role = validated_data.get('role')
        user = super().create(validated_data)
        if role == 1:
            user.is_staff = True
        user.save()
        return user


class JobFormSerializer(serializers.ModelSerializer):
    class Meta:
        model = JobEntry
        exclude = ('job_id', 'owner_id')

    def create(self, validated_data):
        unique_id = self.generate_unique_id()
        validated_data['job_id'] = unique_id
        validated_data['owner_id'] = unique_id
        return super().create(validated_data)
    
    def generate_unique_id(self):
        while True:
            unique_id = random.randint(10000000, 99999999)
            if not JobEntry.objects.filter(job_id=unique_id).exists():
                return unique_id
