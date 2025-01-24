from django.db import models


class DevolutionMode(models.TextChoices):
    SEPARATE = "Lots séparés"
    GENERAL = "Ent générale"
    NC = "NC"


class ProjectStatus(models.TextChoices):
    "Opération livrée"
    "En Chantier"
    "Etude de maîtrise d'œuvre"
    "Suspendue"
    "Sélection mandataire"
    "Sélection entreprise"
    "Etudes et diagnostics"
    "Abandonné"

