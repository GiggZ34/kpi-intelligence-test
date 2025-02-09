from django.db import models


class ProjectManagement(models.Model):
    label = models.CharField()

    class Meta:
        db_table = "model_project_management"
        ordering = ["label"]
