from __future__ import unicode_literals

from uuid import uuid4
import datetime

from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.db import models
from timezone_field import TimeZoneField
from django.utils import timezone
from django.core.urlresolvers import reverse
import pytz

from authenticating.email import VerifyUserEmail
from bennedetto.utils import expand_url_path


def get_default_timezone():
    return pytz.timezone('US/Central')


class PasswordsDontMatch(Exception):
    pass


class IncorrectPassword(Exception):
    pass


class UserManager(BaseUserManager):
    def create_user(self, email, password=None):
        user = self.model(email=email)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, email, password):
        user = self.model(email=email)
        user.set_password(password)
        user.is_staff = True
        user.save()
        return user

    def midnight(self, now=None):
        '''
        returns all users that are *currently* experiencing
        the first hour of their day
        '''
        now = now or datetime.datetime.now(pytz.utc)
        zones = [tz for tz in pytz.common_timezones_set
                 if now.astimezone(pytz.timezone(tz)).hour == 0]
        return self.filter(timezone__in=zones)

    def verify(self, key):
        user = self.get(verify_key=key)
        user.verified = True
        user.save()


class User(AbstractBaseUser):
    PasswordsDontMatch = PasswordsDontMatch
    IncorrectPassword = IncorrectPassword

    objects = UserManager()

    id = models.UUIDField(primary_key=True,
                          unique=True,
                          editable=False,
                          default=uuid4)

    email = models.EmailField(unique=True)
    verified = models.BooleanField(default=False)
    verify_key = models.UUIDField(default=uuid4, editable=False, unique=True)
    timezone = TimeZoneField(default=get_default_timezone)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    def get_full_name(self):
        return self.get_short_name()

    def get_short_name(self):
        return self.email

    def has_perm(self, *args, **kwargs):
        return self.is_staff

    def has_module_perms(self, *args):
        return self.is_staff

    def activate_timezone(self):
        timezone.activate(self.timezone)

    def send_verification_email(self):
        if self.verified:
            return False
        VerifyUserEmail(user=self).send()

    def get_verify_link(self):
        key = str(self.verify_key)
        path = reverse('verify', args=[key])
        return expand_url_path(path)

    def change_password(self, old, new):
        new, new_copy = new
        if not new == new_copy:
            raise self.PasswordsDontMatch

        if not self.check_password(old):
            raise self.IncorrectPassword

        self.set_password(new)

        self.save()
        return self


class FamilyManager(models.Manager):
    def create_from_user(self, user, name):
        family = self.create(name=name)
        membership = Membership.objects.create(user=user,
                                               family=family,
                                               admin=True)
        return membership.save()


class Family(models.Model):
    objects = FamilyManager()

    name = models.CharField(max_length=120)
    members = models.ManyToManyField(User, through='Membership')

    def __unicode__(self):
        return self.name

    def invite_user_to_family(self, email=None):
        user = User.objects.create(email=email, is_active=False)
        Membership(user=user, family=self, admin=False).save()
        return user.save()

    class Meta:
        verbose_name_plural = 'Families'


class Membership(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    family = models.ForeignKey(Family, on_delete=models.CASCADE)
    admin = models.BooleanField(default=False)

    def __unicode__(self):
        return '{0} Membership'.format(self.family.__unicode__())

    @property
    def family_name(self):
        return self.family.name

    @property
    def email(self):
        return self.user.email

    @property
    def verified(self):
        return self.user.verified
