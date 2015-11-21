from decimal import Decimal

from django.test import TestCase

from authenticating.models import User
from tracking.models import Rate, Transaction


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


class TransactionTestCase(TestCase):
    def test_sum_nothing(self):
        actual = Transaction.objects.total()
        self.assertEqual(actual, 0)

    def test_sum_one(self):
        mock = Transaction()
        mock.amount = Decimal(10)
        mock.description = 'Test'
        mock.user = User.objects.create_user('test@yahoo.com')
        mock.save()

        actual = Transaction.objects.total()
        self.assertEqual(actual, to_decimal(10))

    def test_sum_two(self):
        mock = Transaction()
        mock.amount = Decimal(10)
        mock.description = 'Test'
        mock.user = User.objects.create_user('test@yahoo.com')
        mock.save()

        mock2 = Transaction()
        mock2.amount = Decimal(-5)
        mock2.description = 'Test'
        mock2.user = User.objects.create_user('another@yahoo.com')
        mock2.save()

        actual = Transaction.objects.total()
        self.assertEqual(actual, to_decimal(5))
