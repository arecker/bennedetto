from rest_framework import serializers

from authenticating.models import User, Membership


class MembershipSerializer(serializers.ModelSerializer):
    class Meta:
        model = Membership
        fields = ('admin', 'family_name', 'email', 'verified')


class UserSerializer(serializers.ModelSerializer):
    timezone = serializers.CharField()
    membership = MembershipSerializer()

    class Meta:
        model = User
        fields = ('email', 'verified', 'timezone', 'membership')
