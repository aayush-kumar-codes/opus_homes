from django.shortcuts import render

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import status
from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated

from django.contrib.auth.hashers import make_password, check_password
from django.shortcuts import get_object_or_404

from .serializers import RegisterSerializer
from .models import User


class Register(APIView):
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        confirm_password = request.data.get("confirm_password")
        if serializer.is_valid():
            if serializer.validated_data.get("password") != confirm_password:
                return Response("Your password and confirm_password does not match",
                        status=status.HTTP_400_BAD_REQUEST)
            serializer.save(password=make_password(request.data['password']))
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class Login(APIView):
    def post(self, request):
        email = request.data.get("email")
        password = request.data.get("password")
        user = get_object_or_404(User, email=email)
        if user and check_password(password, user.password):
            refresh = RefreshToken.for_user(user)
            token = str(refresh.access_token)
            return Response({'message': 'Login successful', 'token': token}, status=status.HTTP_202_ACCEPTED)
        else:
            return Response("wrong password", status=status.HTTP_400_BAD_REQUEST)
        

class UserDetailsView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        user = request.user
        serializer = RegisterSerializer(user)
        response = serializer.data
        response.pop('password')
        return Response(response, status=status.HTTP_200_OK)
    
    def patch(self, request):
        user = request.user
        serializer = RegisterSerializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            response= serializer.data
            response.pop('password', 'last_login')
            return Response(response, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
