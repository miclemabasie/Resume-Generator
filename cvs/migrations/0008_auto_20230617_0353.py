# Generated by Django 3.2 on 2023-06-17 03:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cvs', '0007_auto_20230614_1804'),
    ]

    operations = [
        migrations.RenameField(
            model_name='experience',
            old_name='role',
            new_name='position',
        ),
        migrations.RemoveField(
            model_name='contact',
            name='email',
        ),
        migrations.RemoveField(
            model_name='contact',
            name='phone',
        ),
        migrations.AddField(
            model_name='achievement',
            name='date',
            field=models.DateTimeField(blank=True, null=True, verbose_name='Date'),
        ),
        migrations.AddField(
            model_name='achievement',
            name='link',
            field=models.CharField(blank=True, max_length=100, null=True, verbose_name='Link'),
        ),
        migrations.AddField(
            model_name='achievement',
            name='organization',
            field=models.CharField(blank=True, max_length=100, null=True, verbose_name='Orgranization'),
        ),
        migrations.AddField(
            model_name='contact',
            name='github',
            field=models.CharField(blank=True, max_length=20, null=True, verbose_name='Github'),
        ),
        migrations.AddField(
            model_name='contact',
            name='linkedin',
            field=models.EmailField(blank=True, max_length=254, null=True, verbose_name='LinkedIn'),
        ),
        migrations.AddField(
            model_name='contact',
            name='website',
            field=models.CharField(blank=True, max_length=20, null=True, verbose_name='Website'),
        ),
        migrations.AddField(
            model_name='education',
            name='description',
            field=models.CharField(blank=True, max_length=300, null=True, verbose_name='Description'),
        ),
        migrations.AddField(
            model_name='education',
            name='major',
            field=models.CharField(blank=True, max_length=100, null=True, verbose_name='Major'),
        ),
        migrations.AddField(
            model_name='experience',
            name='achievements',
            field=models.CharField(blank=True, max_length=300, null=True, verbose_name='Your Achievements'),
        ),
    ]
