# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('authenticating', '0004_user_verified'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='verify_key',
            field=models.UUIDField(default=uuid.uuid4, unique=True, editable=False),
        ),
    ]
