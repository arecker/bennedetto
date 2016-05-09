from rest_framework.viewsets import ViewSet
from rest_framework.response import Response
from rest_framework.decorators import list_route
from django.core.urlresolvers import reverse

from tracking.models import Transaction


class ReportViewSet(ViewSet):
    def _to_absolute_url(self, name):
        rel = reverse('api:{}'.format(name))
        return self.request.build_absolute_uri(rel)

    def _get_transactions(self):
        return Transaction.objects.user(self.request.user)

    def list(self, *args, **kwargs):
        return Response({'summary': self._to_absolute_url('reports-summary')})

    @list_route(methods=['get'], url_path='summary')
    def summary(self, request):
        transactions = self._get_transactions()
        return Response({'today': transactions.today().total(),
                         'week': transactions.last_week().total(),
                         'weekExpense': transactions.last_week().total_expense(),
                         'month': transactions.last_month().total(),
                         'monthExpense': transactions.last_month().total_expense(),
                         'year': transactions.last_year().total()})
