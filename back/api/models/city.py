from django.db import models


class City(models.Model):
    label = models.CharField(primary_key=True, db_index=True, unique=True)

    class Meta:
        db_table = "model_city"
        ordering = ["label"]
