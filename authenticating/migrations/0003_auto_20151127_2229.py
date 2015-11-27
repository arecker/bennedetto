# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models
import timezone_field.fields
import authenticating.models


class Migration(migrations.Migration):

    dependencies = [
        ('authenticating', '0002_user_timezone'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='timezone',
            field=timezone_field.fields.TimeZoneField(default=authenticating.models.get_default_timezone),
        ),
    ]
