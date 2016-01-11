import sys
import logging

from django.core.management.base import BaseCommand

from authenticating.models import User
from tracking.models import Transaction


logger = logging.getLogger(__name__)


class Command(BaseCommand):
    help = 'Sums up rate balance and adds a transaction' \
           ' for that sum to each user.'

    def handle(self, *args, **options):
        try:
            users = User.objects.midnight()
            num_users = users.count()

            if num_users:
                Transaction.objects.bulk_transact_rate_total(users)
                logger.info('transact succeeded for {0} users'.format(num_users))
            else:
                logger.info('no users to transact')

        except Exception:
            logger.critical('transact failed: {0}'.format(sys.exc_info()))
