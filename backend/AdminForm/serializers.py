import random

from rest_framework import serializers

from .models import (JobEntry, JobEntryDetails)


class JobFormSerializer(serializers.ModelSerializer):
    class Meta:
        model = JobEntry
        exclude = ('job_id', 'owner_id', 'user',)

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
            

class GetJobFormSerializer(serializers.ModelSerializer):
    class Meta:
        model = JobEntry
        fields = ('job_id', 'job_name')


class GettingJobEntryDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = JobEntryDetails
        fields = "__all__"
