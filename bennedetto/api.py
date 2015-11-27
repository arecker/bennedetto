from rest_framework.routers import DefaultRouter

from tracking.views import RateViewSet, TransactionViewSet
from reporting.views import ReportViewSet

router = DefaultRouter()
router.register('rates', RateViewSet)
router.register('transactions', TransactionViewSet)
router.register('reports', ReportViewSet, 'reports')
