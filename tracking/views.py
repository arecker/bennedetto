from rest_framework import viewsets

from tracking.models import Rate, Transaction
from tracking.serializers import (RateCreateSerializer,
                                  RateSerializer,
                                  TransactionSerializer,
                                  TransactionCreateSerializer)


def restrict_to_user(func):
    def wrapper(self, *args, **kwargs):
        qs = func(self, *args, **kwargs)
        return qs.user(self.request.user)
    return wrapper


class SpecifyCreateSerializerMixin(object):
    def get_serializer_class(self, *args, **kwargs):
        if self.action == 'create':
            return self.serializer_create_class
        return self.serializer_class


class RateViewSet(SpecifyCreateSerializerMixin, viewsets.ModelViewSet):
    queryset = Rate.objects.all()
    serializer_class = RateSerializer
    serializer_create_class = RateCreateSerializer

    @restrict_to_user
    def get_queryset(self, *args, **kwargs):
        return super(RateViewSet, self).get_queryset(*args, **kwargs)


class TransactionViewSet(SpecifyCreateSerializerMixin, viewsets.ModelViewSet):
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer
    serializer_create_class = TransactionCreateSerializer

    @restrict_to_user
    def get_queryset(self, *args, **kwargs):
        return super(TransactionViewSet, self).get_queryset(*args, **kwargs)
