from rest_framework import serializers

from tracking.models import Rate


class RateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rate
        exclude = ()


class RateCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rate
        exclude = ('amount_per_day', )
