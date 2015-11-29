# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tracking', '0002_transaction'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='rate',
            options={'ordering': ('-amount_per_day',)},
        ),
        migrations.AlterModelOptions(
            name='transaction',
            options={'ordering': ('-timestamp',)},
        ),
    ]
