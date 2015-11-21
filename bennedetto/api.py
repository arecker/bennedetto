from rest_framework.routers import DefaultRouter

from tracking.views import RateViewSet, TransactionViewSet

router = DefaultRouter()
router.register('rates', RateViewSet)
router.register('transactions', TransactionViewSet)
