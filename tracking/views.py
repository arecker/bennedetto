from rest_framework import viewsets

from tracking.models import Rate, Transaction
from tracking.serializers import (RateCreateSerializer,
                                  RateSerializer,
                                  TransactionSerializer,
                                  TransactionCreateSerializer)


class SpecifyCreateSerializerMixin(object):
    def get_serializer_class(self, *args, **kwargs):
        import ipdb
        ipdb.set_trace()
        if self.action == 'create':
            return self.serializer_create_class
        return self.serializer_class


class RateViewSet(viewsets.ModelViewSet, SpecifyCreateSerializerMixin):
    queryset = Rate.objects.all()
    serializer_class = RateSerializer
    serializer_create_class = RateCreateSerializer


class TransactionViewSet(viewsets.ModelViewSet, SpecifyCreateSerializerMixin):
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer
    serializer_create_class = TransactionCreateSerializer
