from django.contrib.auth.forms import UserCreationForm

from authenticating.models import User


class UserCreationForm(UserCreationForm):
    class Meta:
        model = User
        fields = ('email', 'timezone')
