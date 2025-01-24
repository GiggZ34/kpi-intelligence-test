from django.db import models


class DevolutionMode(models.TextChoices):
    SEPARATE = "Lots séparés"
    GENERAL = "Ent générale"
    NC = "NC"


class ProjectStatus(models.TextChoices):
    STUDIES_DIAGNOSTICS = "Etudes et diagnostics"
    REPRESENTATIVE_SELECTION = "Sélection mandataire"
    COMPANY_SELECTION = "Sélection entreprise"
    PROJECT_MANAGEMENT_STUDY = "Etude de maîtrise d'œuvre"
    UNDER_CONSTRUCTION = "En Chantier"
    OPERATION_DELIVRED = "Opération livrée"
    SUSPENDED = "Suspendue"
    CANCCELED = "Abandonné"
