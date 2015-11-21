from uuid import uuid4
from decimal import Decimal

from django.db import models
from django.core.validators import MinValueValidator
from django.utils import timezone

from authenticating.models import User
from bennedetto.utils import display_money


class TotalByMixin(object):
    def __init__(self):
        if not getattr(self, 'total_by', None):
            raise AttributeError('TotalByMixin requires a'
                                 '"total_by" property on the model')

    def total(self):
        expr = models.Sum(self.total_by)
        key = '{}__sum'.format(self.total_by)
        return self.aggregate(expr)[key] or 0


class RateQuerySet(models.QuerySet, TotalByMixin):
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
                                  display_money(self.amount_per_day))


class TransactionQuerySet(models.QuerySet, TotalByMixin):
    total_by = 'amount'


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
                                  display_money(self.amount))
