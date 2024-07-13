import random

from rest_framework import serializers

from .models import User


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
