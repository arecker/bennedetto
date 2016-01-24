from decimal import Decimal
from rest_framework.test import APITestCase, APIClient
from django.utils import timezone
from authenticating.models import User
from tracking.models import Transaction


class TestTransactionsApi(APITestCase):
    URL = "/api/transactions/"
    data = {"Timestamp": "123456789", "Description": "Derp", "User": "Mxito@wepesi.com"}

    def test_should_reject_unauthenticated_requests(self):
        get_response = self.client.get(self.URL, format='json')
        self.assertEqual(403, get_response.status_code)

        post_response = self.client.post(self.URL, data=self.data, format='json')
        self.assertEqual(403, post_response.status_code)
        self.assertEqual(0, Transaction.objects.count())

        head_response = self.client.head(self.URL, data=self.data, format='json')
        self.assertEqual(403, head_response.status_code)

        user = self.create_user()
        transaction = self.create_transaction(user=user)
        self.assertEqual(1, Transaction.objects.count())

        delete_response = self.client.delete(self.URL, data={"Id": transaction.id}, format='json')
        self.assertEqual(403, delete_response.status_code)

    def test_should_accept_authenticated_requests(self):
        user = self.create_user()
        time = timezone.now()
        transaction = self.create_transaction(user=user, timestamp=time, description='desc')

        client = APIClient()
        client.force_authenticate(user=user)

        get_response = client.get(self.URL, format='json')
        self.assertEqual(200, get_response.status_code)
        get_response.data[0]['timestamp'] = ''
        self.assertEqual(1, len(get_response.data))
        self.assertEqual({"id": str(transaction.id), "timestamp": '',
                          "description": 'desc', "amount": '10.00', "user": user.id},
                         get_response.data[0])

    def create_user(self, user_email='test@example.com'):
        return User.objects.create_user(user_email)

    def create_transaction(self, amount=10, timestamp=timezone.now(), description="spent dough", user=None):
        if not user:
            user = self.create_user()

        transaction = Transaction()
        transaction.amount = Decimal(amount)
        transaction.description = description
        transaction.user = user
        transaction.timestamp = timestamp
        transaction.save()
        return transaction
