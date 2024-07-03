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
    def post(self,request):
        user = request.user
        serializer = CRMSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=user)
            response = serializer.data
            return Response(response, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)




