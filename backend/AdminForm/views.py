from django.shortcuts import get_object_or_404

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, IsAdminUser

from .serializers import (JobFormSerializer,GetJobFormSerializer,
                             GettingJobEntryDetailsSerializer)

from .models import JobEntry, JobEntryDetails
from .utils import Building_item_list, record_updation


class AdminForm(APIView):
    permission_classes = [IsAdminUser]
    
    def post(self, request):
        user = request.user
        serializer = JobFormSerializer(data=request.data)
        if serializer.is_valid():
            jobentry = serializer.save(user=user)
            response = serializer.data
            Building_item_list(jobentry)
            return Response(response, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, job_id):
        job = get_object_or_404(JobEntry, job_id=job_id)
        job.delete()
        return Response({"message":"Job_id deleted"}, status=status.HTTP_200_OK)

    
    def get(self, request, job_id=None):
        user = request.user
        if job_id==None:
           job_forms = JobEntry.objects.filter(user=user)
           serializer = GetJobFormSerializer(job_forms, many=True)
           response = serializer.data
           return Response(response , status=status.HTTP_200_OK)
        else:
           job_form = get_object_or_404(JobEntry, job_id=job_id, user=user)
           serializer = JobFormSerializer(job_form)
           response = dict(serializer.data)
           response["job_id"] = job_form.job_id
           response["owner_id"] = job_form.owner_id
           return Response(response, status=status.HTTP_200_OK)
        

class GettingJobEntryDetails(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request, job_id):
        user =  request.user
        job = get_object_or_404(JobEntry, job_id=job_id)
        job_id = job.id
        job_table = JobEntryDetails.objects.filter(job_id=job_id)
        serializer = GettingJobEntryDetailsSerializer(job_table, many=True)
        response = serializer.data
        return Response(response, status=status.HTTP_200_OK)
    
    def patch(self, request, job_id, item_id):
        job = get_object_or_404(JobEntry, job_id=job_id)
        job_id = job.id
        job_table_item = get_object_or_404(JobEntryDetails, job_id=job_id, id=item_id)
        serializer = GettingJobEntryDetailsSerializer(job_table_item, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            job_record = record_updation(job_id)
        response= serializer.data
        response["job_record"] = job_record
        response["job_id"] = job.job_id
        return Response(response, status=status.HTTP_200_OK)

