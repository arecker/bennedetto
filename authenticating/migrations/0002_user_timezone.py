# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models
import timezone_field.fields


class Migration(migrations.Migration):

    dependencies = [
        ('authenticating', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='timezone',
            field=timezone_field.fields.TimeZoneField(default=b'America/Chicago'),
        ),
    ]
