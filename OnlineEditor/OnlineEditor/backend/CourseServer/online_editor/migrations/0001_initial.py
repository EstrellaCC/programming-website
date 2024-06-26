# Generated by Django 4.2.11 on 2024-03-14 09:00

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):
    initial = True

    dependencies = [
        ("courseApp", "0001_initial"),
    ]

    operations = [
        migrations.CreateModel(
            name="Codes",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                (
                    "code_id",
                    models.CharField(max_length=100, unique=True, verbose_name="代码id"),
                ),
                (
                    "code_result",
                    models.TextField(blank=True, null=True, verbose_name="代码输出结果"),
                ),
                ("errors", models.TextField(blank=True, null=True)),
                ("compile_status", models.CharField(max_length=100)),
                ("create_time", models.DateTimeField(auto_now=True, null=True)),
                ("user_id", models.IntegerField(blank=True, null=True)),
                (
                    "course",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to="courseApp.mycourse",
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="Sources",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("title", models.CharField(max_length=50)),
                (
                    "content",
                    models.TextField(blank=True, null=True, verbose_name="代码内容"),
                ),
                (
                    "code",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to="online_editor.codes",
                        to_field="code_id",
                    ),
                ),
            ],
        ),
    ]