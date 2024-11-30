from rest_framework import serializers

from .models import UserData


class UserDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserData
        fields = (
            "pk",
            "username",
            "user_url",
            "text_data"
        )