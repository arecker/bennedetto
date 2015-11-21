from decimal import Decimal

from django.test import TestCase

from authenticating.models import User
from tracking.models import Rate


def to_decimal(amount, place='0.001'):
    return Decimal(amount).quantize(Decimal(place))


class RateTestCase(TestCase):
    def test_calculate_amount_per_day(self):
        instance = Rate()
        instance.description = 'Test Rate'
        instance.amount = Decimal(10)
        instance.days = 10
        instance.user = User.objects.create_user('test@yahoo.com')
        instance.save()
        instance.refresh_from_db()
        self.assertEqual(instance.amount_per_day, Decimal(1))

    def test_calculate_round_amount_per_day(self):
        instance = Rate()
        instance.description = 'Test Rate'
        instance.amount = Decimal(10)
        instance.days = 11
        instance.user = User.objects.create_user('test@yahoo.com')
        instance.save()
        instance.refresh_from_db()
        self.assertEqual(instance.amount_per_day, to_decimal(0.909))

    def test_calculate_negative_amount_per_day(self):
        instance = Rate()
        instance.description = 'Test Rate'
        instance.amount = Decimal(-10)
        instance.days = 11
        instance.user = User.objects.create_user('test@yahoo.com')
        instance.save()
        instance.refresh_from_db()
        self.assertEqual(instance.amount_per_day, to_decimal(-0.909))
