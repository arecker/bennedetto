from rest_framework import viewsets
from dateutil import parser

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
        from_date = self.request.query_params.get('fromDate', None)
        to_date = self.request.query_params.get('toDate', None)

        if from_date:
            from_date = parser.parse(from_date)

        if to_date:
            to_date = parser.parse(to_date)

        qs = super(TransactionViewSet, self).get_queryset(*args, **kwargs)

        if from_date or to_date:
            return qs.date_range(from_date, to_date)
        return qs
