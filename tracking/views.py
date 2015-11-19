from rest_framework import viewsets

from tracking.models import Rate
from tracking.serializers import RateCreateSerializer, RateSerializer


class RateViewSet(viewsets.ModelViewSet):
    queryset = Rate.objects.all()
    serializer_class = RateSerializer
    serializer_create_class = RateCreateSerializer

    def get_serializer_class(self, *args, **kwargs):
        if self.action == 'create':
            return self.serializer_create_class
        return super(RateViewSet, self).get_serializer_class(*args, **kwargs)
