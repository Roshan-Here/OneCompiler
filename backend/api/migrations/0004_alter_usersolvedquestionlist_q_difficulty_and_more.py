# Generated by Django 5.0.3 on 2024-06-16 18:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("api", "0003_alter_usersolvedquestionlist_user"),
    ]

    operations = [
        migrations.AlterField(
            model_name="usersolvedquestionlist",
            name="Q_difficulty",
            field=models.CharField(blank=True, max_length=75, null=True),
        ),
        migrations.AlterField(
            model_name="usersolvedquestionlist",
            name="Q_slug",
            field=models.CharField(blank=True, max_length=75, null=True),
        ),
        migrations.AlterField(
            model_name="usersolvedquestionlist",
            name="Q_title",
            field=models.CharField(blank=True, max_length=225, null=True),
        ),
    ]