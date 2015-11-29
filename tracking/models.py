from uuid import uuid4
from decimal import Decimal
import datetime

from django.db import models
from django.core.validators import MinValueValidator
from django.utils import timezone

from authenticating.models import User


class TotalByMixin(object):
    def __init__(self, *args, **kwargs):
        if not getattr(self, 'total_by', None):
            raise AttributeError('TotalByMixin requires a'
                                 '"total_by" property on the model')
        super(TotalByMixin, self).__init__()

    def total(self):
        expr = models.Sum(self.total_by)
        key = '{}__sum'.format(self.total_by)
        return self.aggregate(expr)[key] or 0


class UserMixin(object):
    user_by = 'user'

    def user(self, user):
        return self.filter((self.user_by, user))


class RateQuerySet(models.QuerySet, TotalByMixin, UserMixin):
    total_by = 'amount_per_day'


class Rate(models.Model):
    objects = RateQuerySet.as_manager()

    id = models.UUIDField(primary_key=True,
                          editable=False,
                          default=uuid4,
                          unique=True)

    user = models.ForeignKey(User)
    description = models.CharField(max_length=120)
    amount = models.DecimalField(max_digits=8, decimal_places=2)
    days = models.PositiveIntegerField(validators=[MinValueValidator(1)])
    amount_per_day = models.DecimalField(max_digits=8,
                                         decimal_places=3,
                                         editable=False,
                                         blank=True)

    def save(self, *args, **kwargs):
        self.amount_per_day = self.amount / Decimal(self.days)
        return super(Rate, self).save(*args, **kwargs)

    def __unicode__(self):
        return '{0} ({1})'.format(self.description,
                                  self.amount_per_day)


class TransactionQuerySet(models.QuerySet, TotalByMixin, UserMixin):
    total_by = 'amount'

    def _days_from_today(self, days):
        end = timezone.now()
        start = end - datetime.timedelta(days=days)
        return self.date_range(start, end)

    def date(self, date):
        return self.filter(timestamp__month=date.month,
                           timestamp__day=date.day,
                           timestamp__year=date.year)

    def today(self):
        return self.date(timezone.now())

    def last_week(self):
        return self._days_from_today(7)

    def last_month(self):
        return self._days_from_today(30)

    def last_year(self):
        return self._days_from_today(365)

    def date_range(self, start, end):
        qs = self
        zone = timezone.get_current_timezone()

        if start:
            start = datetime.datetime.combine(start, datetime.time.min)
            start = zone.localize(start)
            qs = qs.filter(timestamp__gte=start)

        if end:
            end = datetime.datetime.combine(end, datetime.time.max)
            end = zone.localize(end)
            qs = qs.filter(timestamp__lte=end)

        return qs

    def create_from_rate_balance(self, user):
        instance = self.model()
        instance.description = 'Rate Total'
        instance.amount = Rate.objects.user(user).total()
        instance.user = user
        return instance

    def bulk_transact_rate_total(self, users):
        return self.bulk_create([self.create_from_rate_balance(user)
                                 for user in users])


class Transaction(models.Model):
    objects = TransactionQuerySet.as_manager()

    id = models.UUIDField(primary_key=True,
                          editable=False,
                          default=uuid4,
                          unique=True)

    user = models.ForeignKey(User)
    description = models.CharField(max_length=120)
    amount = models.DecimalField(max_digits=8, decimal_places=2)
    timestamp = models.DateTimeField(default=timezone.now)

    def __unicode__(self):
        return '{0} ({1})'.format(self.description,
                                  self.amount)
