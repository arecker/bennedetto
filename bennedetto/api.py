from rest_framework.routers import DefaultRouter

from tracking.views import RateViewSet

router = DefaultRouter()
router.register('rates', RateViewSet)
