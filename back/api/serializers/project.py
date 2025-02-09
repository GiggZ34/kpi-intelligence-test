from rest_framework import serializers

from api.models import Establishment, Project


class EstablishmentForProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Establishment
        fields = ["code", "label", "longitude", "latitude", "city"]


class ProjectSerializer(serializers.ModelSerializer):
    establishment = EstablishmentForProjectSerializer()
    representative_label = serializers.SerializerMethodField()
    project_management_label = serializers.SerializerMethodField()
    company_label = serializers.SerializerMethodField()

    def get_representative_label(self, instance) -> str:
        representative = getattr(instance, "representative")
        return representative.label if representative else None

    def get_project_management_label(self, instance) -> str:
        project_management = getattr(instance, "project_management")
        return project_management.label if project_management else None

    def get_company_label(self, instance) -> str:
        company = getattr(instance, "company")
        return company.label if company else None

    class Meta:
        model = Project
        fields = [
            "id",
            "titreoperation",
            "montant_des_ap_votes_en_meu",
            "enveloppe_prev_en_meu",
            "notification_du_marche",
            "cao_attribution",
            "annee_d_individualisation",
            "annee_de_livraison",
            "nombre_de_lots",
            "mode_de_devolution",
            "ppi",
            "etat_d_avancement",
            "establishment",
            "representative",
            "representative_label",
            "project_management",
            "project_management_label",
            "company",
            "company_label",
        ]
        read_only_fields = [
            "id",
            "titreoperation",
            "montant_des_ap_votes_en_meu",
            "enveloppe_prev_en_meu",
            "notification_du_marche",
            "cao_attribution",
            "annee_d_individualisation",
            "annee_de_livraison",
            "nombre_de_lots",
            "mode_de_devolution",
            "ppi",
            "etat_d_avancement",
            "establishment",
            "representative",
            "representative_label",
            "project_management",
            "project_management_label",
            "company",
            "company_label",
        ]
