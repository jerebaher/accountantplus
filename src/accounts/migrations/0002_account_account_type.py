# Generated by Django 5.1.4 on 2024-12-21 11:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='account',
            name='account_type',
            field=models.TextField(default='checking'),
        ),
    ]
