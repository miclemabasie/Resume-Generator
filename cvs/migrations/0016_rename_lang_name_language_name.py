# Generated by Django 3.2 on 2023-07-03 21:09

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('cvs', '0015_rename_firsname_personalinfomation_firstname'),
    ]

    operations = [
        migrations.RenameField(
            model_name='language',
            old_name='lang_name',
            new_name='name',
        ),
    ]
