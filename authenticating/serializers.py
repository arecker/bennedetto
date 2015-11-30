from rest_framework import serializers

from authenticating.models import User

class UserSerializer(serializers.ModelSerializer):
    timezone = serializers.CharField()

    class Meta:
        model = User
        fields = ('email', 'verified', 'timezone', )
