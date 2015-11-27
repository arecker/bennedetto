from django.test import TestCase

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
