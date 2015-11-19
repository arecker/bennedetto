# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models
from django.conf import settings
import django.core.validators
import uuid


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Rate',
            fields=[
                ('id', models.UUIDField(primary_key=True, default=uuid.uuid4, serialize=False, editable=False, unique=True)),
                ('description', models.CharField(max_length=120)),
                ('amount', models.DecimalField(max_digits=8, decimal_places=2)),
                ('days', models.PositiveIntegerField(validators=[django.core.validators.MinValueValidator(1)])),
                ('amount_per_day', models.DecimalField(editable=False, max_digits=8, decimal_places=3, blank=True)),
                ('user', models.ForeignKey(to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
