# Generated by Django 3.2 on 2023-07-10 10:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cvs', '0020_auto_20230710_1010'),
    ]

    operations = [
        migrations.AlterField(
            model_name='education',
            name='end',
            field=models.DateTimeField(blank=True, null=True, verbose_name='End'),
        ),
        migrations.AlterField(
            model_name='education',
            name='start',
            field=models.DateTimeField(blank=True, null=True, verbose_name='Start'),
        ),
    ]
