import numpy as np
from django.db import models
from django.db.models import F, Sum, Window
from django.db.models.functions import RowNumber

from api.constants import DevolutionMode, ProjectStatus
from api.utils.math import array_median_index


class ProjectManager(models.Manager):
    def total_voted_budget(self, **kwargs) -> float:
        return (
            self.filter(**kwargs)
            .aggregate(total=Sum("montant_des_ap_votes_en_meu"))
            .get("total", 0)
        )

    def total_planned_budget(self, **kwargs) -> float:
        return (
            self.filter(**kwargs)
            .aggregate(total=Sum("enveloppe_prev_en_meu"))
            .get("total", 0)
        )

    def average_voted_budget(self, **kwargs) -> float:
        return np.divide(
            self.total_voted_budget(**kwargs), self.filter(**kwargs).count()
        )

    def median_voted_budget(self, **kwargs):
        median_index = array_median_index(self.filter(
            montant_des_ap_votes_en_meu__isnull=False,
            **kwargs,
        ).count())

        if median_index < 0:
            return .0

        return (
            self.filter(montant_des_ap_votes_en_meu__isnull=False, **kwargs)
            .order_by("montant_des_ap_votes_en_meu")
            .values("montant_des_ap_votes_en_meu")[median_index]
            .get("montant_des_ap_votes_en_meu")
        )

    def average_planned_budget(self, **kwargs):
        return np.divide(
            self.total_planned_budget(**kwargs), self.filter(**kwargs).count()
        )

    def median_planned_budget(self, **kwargs):
        median_index = array_median_index(
            self.filter(
                enveloppe_prev_en_meu__isnull=False,
                **kwargs,
            ).count()
        )

        if median_index < 0:
            return .0

        return (
            self.filter(enveloppe_prev_en_meu__isnull=False, **kwargs)
            .order_by("enveloppe_prev_en_meu")
            .values("enveloppe_prev_en_meu")[median_index]
            .get("enveloppe_prev_en_meu")
        )

    def median_diff_planned_and_voted_budget(self, **kwargs) -> float:
        median_index = array_median_index(
            self.filter(
                enveloppe_prev_en_meu__isnull=False,
                montant_des_ap_votes_en_meu__isnull=False,
                **kwargs,
            ).count()
        )

        if not median_index:
            return .0

        return (
            self.filter(
                enveloppe_prev_en_meu__isnull=False,
                montant_des_ap_votes_en_meu__isnull=False,
                **kwargs,
            )
            .annotate(
                budget_diff=F("enveloppe_prev_en_meu")
                            - F("montant_des_ap_votes_en_meu")
            )
            .order_by("budget_diff")
            .values("budget_diff")[median_index - 1]
            .get("budget_diff")
        )

    def ranked_voted_budget(self, **kwargs):
        return ((
            self.filter(**kwargs)
            .order_by("-montant_des_ap_votes_en_meu"))
        .annotate(row_number=Window(
            expression=RowNumber(),
            order_by=F('montant_des_ap_votes_en_meu').desc()
        )))

    def ranked_planned_budget(self, **kwargs):
        return (
            self.filter(**kwargs)
            .annotate(row_number=Window(
                expression=RowNumber(),
                order_by=F('enveloppe_prev_en_meu').desc()
            ))
        )


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
        "Establishment", on_delete=models.CASCADE, null=True, related_name="projects"
    )
    representative = models.ForeignKey(
        "Representative", on_delete=models.SET_NULL, null=True, related_name="projects"
    )
    project_management = models.ForeignKey(
        "ProjectManagement",
        on_delete=models.SET_NULL,
        null=True,
        related_name="projects",
    )
    company = models.ForeignKey(
        "Company", on_delete=models.SET_NULL, null=True, related_name="projects"
    )

    objects = ProjectManager()

    class Meta:
        db_table = "model_project"
        ordering = ["annee_de_livraison", "cao_attribution", "notification_du_marche"]
