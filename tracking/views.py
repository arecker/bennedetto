from rest_framework import viewsets

from tracking.models import Rate, Transaction
from tracking.serializers import (RateCreateSerializer,
                                  RateSerializer,
                                  TransactionSerializer)


class RateViewSet(viewsets.ModelViewSet):
    queryset = Rate.objects.all()
    serializer_class = RateSerializer
    serializer_create_class = RateCreateSerializer

    def get_serializer_class(self, *args, **kwargs):
        if self.action == 'create':
            return self.serializer_create_class
        return super(RateViewSet, self).get_serializer_class(*args, **kwargs)


class TransactionViewSet(viewsets.ModelViewSet):
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer
