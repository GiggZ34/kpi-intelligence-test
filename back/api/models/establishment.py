import numpy as np
from django.db import models
from django.db.models import Sum, Window, F
from django.db.models.functions import RowNumber

from api.utils.math import array_median_index


class EstablishmentManager(models.Manager):
    def total_voted_budget(self, **kwargs) -> float:
        return (
            self.filter(**kwargs)
            .aggregate(total=Sum("project__montant_des_ap_votes_en_meu"))
            .get("total", 0)
        )

    def total_planned_budget(self, **kwargs) -> float:
        return (
            self.filter(**kwargs)
            .aggregate(total=Sum("project__enveloppe_prev_en_meu"))
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

        if not median_index:
            return .0

        return (
            self.filter(montant_des_ap_votes_en_meu__isnull=False, **kwargs)
            .order_by("project__montant_des_ap_votes_en_meu")
            .values("project__montant_des_ap_votes_en_meu")[median_index]
            .get("project__montant_des_ap_votes_en_meu")
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

        if not median_index:
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


class Establishment(models.Model):
    code = models.CharField(primary_key=True, unique=True, db_index=True)
    label = models.CharField()
    longitude = models.FloatField(null=True)
    latitude = models.FloatField(null=True)
    city = models.ForeignKey(
        "City", on_delete=models.CASCADE, related_name="establishment"
    )

    objects = EstablishmentManager()

    class Meta:
        db_table = "model_establishment"
        ordering = ["label"]
