from rest_framework import serializers

from tracking.models import Rate


class RateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rate
        exclude = ()


class RateCreateSerializer(serializers.ModelSerializer):
    def create(self, valid_data):
        request = self.context.get('request')
        valid_data['user'] = request.user
        return super(RateCreateSerializer, self).create(valid_data)

    class Meta:
        model = Rate
        exclude = ('amount_per_day', 'user')
