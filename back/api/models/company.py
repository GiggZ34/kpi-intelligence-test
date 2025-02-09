from django.db import models


class Company(models.Model):
    label = models.CharField()

    class Meta:
        db_table = "model_company"
        ordering = ["label"]
