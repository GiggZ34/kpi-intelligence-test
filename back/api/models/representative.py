from django.db import models


class Representative(models.Model):
    label = models.CharField()

    class Meta:
        db_table = "model_representative"
        ordering = ["label"]
