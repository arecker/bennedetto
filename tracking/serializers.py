from rest_framework import serializers
from django.utils import timezone
from pytz import utc
from dateutil import parser

from tracking.models import Rate, Transaction


class TimeZoneDateTimeField(serializers.DateTimeField):
    def to_representation(self, value):
        local_value = timezone.localtime(value)
        return super(TimeZoneDateTimeField, self).to_representation(local_value)

    def to_internal_value(self, value):
        if getattr(value, 'astimezone', False):
            utc_value = value.astimezone(utc)
        else:
            naive = parser.parse(value)
            utc_value = naive.astimezone(utc)
        return super(TimeZoneDateTimeField, self).to_internal_value(utc_value)


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
