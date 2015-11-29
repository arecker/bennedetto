import datetime

from django.test import TestCase
import pytz

from authenticating.forms import UserCreationForm
from authenticating.models import User


class SimpleTestCase(TestCase):
    def test_forms_user_creation_form_valid(self):
        form = UserCreationForm({
            'name': 'Test User',
            'email': 'test@example.org',
            'password1': 'test42',
            'password2': 'test42',
            'timezone': 'US/Central',
        })
        self.assertTrue(form.is_valid())

    def test_forms_user_creation_form_password_mismatch(self):
        form = UserCreationForm({
            'name': 'Test User',
            'email': 'test@example.org',
            'password1': 'test42',
            'password2': 'test24',
            'timezone': 'US/Central',
        })
        self.assertFalse(form.is_valid())

    def test_models_user_manager(self):
        user = User.objects.create_user('test@example.org', 'test42')
        self.assertFalse(user.is_staff)

        user = User.objects.create_superuser('root@example.org', 'test42')
        self.assertTrue(user.is_staff)


class UserModelTestCase(TestCase):
    def test_midnight(self):
        bill = User.objects.create_user('bill@wildstallions.com')
        bill.timezone = pytz.timezone('US/Eastern')
        bill.save()

        ted = User.objects.create_user('ted@wildstallions.com')
        ted.timezone = pytz.timezone('US/Pacific')
        ted.save()

        # bill's midnight
        now = datetime.datetime(2014, 1, 1, 5, 0, 0, 0, pytz.utc)
        actual = User.objects.midnight(now=now)
        self.assertEqual(len(actual), 1)
        actual = actual.first()
        self.assertEqual(actual.email, 'bill@wildstallions.com')

        # ted's midnight
        now = datetime.datetime(2014, 1, 1, 8, 0, 0, 0, pytz.utc)
        actual = User.objects.midnight(now=now)
        self.assertEqual(len(actual), 1)
        actual = actual.first()
        self.assertEqual(actual.email, 'ted@wildstallions.com')

        # neither
        now = datetime.datetime(2014, 1, 1, 6, 0, 0, 0, pytz.utc)
        actual = User.objects.midnight(now=now).exists()
        self.assertFalse(actual)  # if we got here, most excellent!
