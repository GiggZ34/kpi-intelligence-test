from django.db import models

from api.constants import DevolutionMode, ProjectStatus


class City(models.Model):
    label = models.CharField(primary_key=True, db_index=True, unique=True)

    class Meta:
        db_table = "model_city"
        ordering = ["label"]


class Establishment(models.Model):
    code = models.CharField(primary_key=True, unique=True, db_index=True)
    label = models.CharField()
    longitude = models.FloatField(null=True)
    latitude = models.FloatField(null=True)
    city = models.ForeignKey(
        "City", on_delete=models.CASCADE, related_name="establishment"
    )

    class Meta:
        db_table = "model_establishment"
        ordering = ["label"]


class Representative(models.Model):
    label = models.CharField()

    class Meta:
        db_table = "model_representative"
        ordering = ["label"]


class ProjectManagement(models.Model):
    label = models.CharField()

    class Meta:
        db_table = "model_project_management"
        ordering = ["label"]


class Company(models.Model):
    label = models.CharField()

    class Meta:
        db_table = "model_company"
        ordering = ["label"]


class Project(models.Model):
    titreoperation = models.TextField()
    montant_des_ap_votes_en_meu = models.FloatField(null=True)
    enveloppe_prev_en_meu = models.FloatField(null=True)
    notification_du_marche = models.DateField(null=True)
    cao_attribution = models.DateField(null=True)
    annee_d_individualisation = models.CharField(max_length=4, null=True)
    annee_de_livraison = models.CharField(max_length=4, null=True)
    nombre_de_lots = models.IntegerField(null=True)
    mode_de_devolution = models.CharField(
        choices=DevolutionMode.choices, default=DevolutionMode.NC
    )
    ppi = models.CharField()
    etat_d_avancement = models.CharField(choices=ProjectStatus.choices, db_index=True)
    establishment = models.ForeignKey(
        "Establishment", on_delete=models.CASCADE, null=True, related_name="project"
    )
    representative = models.ForeignKey(
        "Representative", on_delete=models.SET_NULL, null=True, related_name="project"
    )
    project_management = models.ForeignKey(
        "ProjectManagement",
        on_delete=models.SET_NULL,
        null=True,
        related_name="project",
    )
    company = models.ForeignKey(
        "Company", on_delete=models.SET_NULL, null=True, related_name="project"
    )

    class Meta:
        db_table = "model_project"
        ordering = ["annee_de_livraison", "cao_attribution", "notification_du_marche"]
