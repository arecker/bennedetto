from rest_framework.routers import DefaultRouter

from authenticating.views import UserViewSet
from tracking.views import RateViewSet, TransactionViewSet
from reporting.views import ReportViewSet

router = DefaultRouter()
router.register('user', UserViewSet, 'user')
router.register('rates', RateViewSet)
router.register('transactions', TransactionViewSet)
router.register('reports', ReportViewSet, 'reports')
