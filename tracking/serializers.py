from rest_framework import serializers
from django.utils import timezone

from tracking.models import Rate, Transaction


class TimeZoneDateTimeField(serializers.DateTimeField):
    def to_native(self, value):
        value = timezone.localtime(value)
        return super(TimeZoneDateTimeField, self).to_native(value)


def assign_user(func):
    def wrapper(self, valid_data):
        request = self.context.get('request')
        valid_data['user'] = request.user
        return func(self, valid_data)
    return wrapper


class RateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rate
        exclude = ()


class RateCreateSerializer(serializers.ModelSerializer):
    @assign_user
    def create(self, *args, **kwargs):
        return super(RateCreateSerializer, self).create(*args, **kwargs)

    class Meta:
        model = Rate
        exclude = ('amount_per_day', 'user')


class TransactionSerializer(serializers.ModelSerializer):
    timestamp = TimeZoneDateTimeField()

    class Meta:
        model = Transaction
        exclude = ()


class TransactionCreateSerializer(serializers.ModelSerializer):
    timestamp = TimeZoneDateTimeField()

    @assign_user
    def create(self, *args, **kwargs):
        return super(TransactionCreateSerializer, self).create(*args, **kwargs)

    class Meta:
        model = Transaction
        exclude = ('user', )
