# Generated by Django 5.0.3 on 2024-06-19 14:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("api", "0004_alter_usersolvedquestionlist_q_difficulty_and_more"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="userprofile",
            name="picture",
        ),
        migrations.AddField(
            model_name="userprofile",
            name="picture_url",
            field=models.URLField(blank=True, max_length=500, null=True),
        ),
    ]
