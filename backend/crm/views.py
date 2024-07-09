from django.shortcuts import get_object_or_404

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated

from .serializers import CRMSerializer
from .models import CRM
from user.models import User

class CustomerRelation(APIView):
    
    permission_classes = [IsAuthenticated]
    
    def post(self, request):
        user = request.user
        serializer = CRMSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=user)
            response = serializer.data
            return Response(response, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class ManageCrmRecords(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request, id=None):
        user = request.user
        records = CRM.objects.filter(user=user)
        serializer = CRMSerializer(records, many=True)
        response = serializer.data
        return Response(response, status=status.HTTP_200_OK)
    
    def delete(self , request, id):
        user = request.user
        record = get_object_or_404(CRM, id=id, user=user)
        record.delete()
        return Response({"message":"Record removed Successfully"}, status=status.HTTP_200_OK)

    def patch(self, request, id):
        user = request.user
        record = get_object_or_404(CRM, id=id, user=user)
        serializer = CRMSerializer(record, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({"message":"The details are updated."}, status=status.HTTP_202_ACCEPTED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
        



        

     






