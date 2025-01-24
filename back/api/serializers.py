from rest_framework import serializers

from api.models import (
    Company,
    Establishment,
    Project,
    ProjectManagement,
    Representative, City,
)


class CitySerializer(serializers.ModelSerializer):
    class Meta:
        model = City
        fields = [
            "label"
        ]


class EstablishmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Establishment
        fields = ["code", "label", "longitude", "latitude", "city"]


class RepresentativeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Representative
        fields = ["label"]


class ProjectManagementSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectManagement
        fields = ["label"]


class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields = ["label"]


class ProjectSerializer(serializers.ModelSerializer):
    establishment = EstablishmentSerializer()
    representative = RepresentativeSerializer(allow_null=True)
    project_management = ProjectManagementSerializer(allow_null=True)
    company = CompanySerializer(allow_null=True)

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
            "project_management",
            "company",
        ]
