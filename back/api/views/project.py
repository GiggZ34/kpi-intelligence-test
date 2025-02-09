from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.decorators import action
from rest_framework.filters import OrderingFilter, SearchFilter
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet, mixins

from api.models import Project
from api.serializers import ProjectSerializer
from api.services.project import ProjectKpi


class ProjectViewSet(GenericViewSet, mixins.ListModelMixin, mixins.RetrieveModelMixin):
    serializer_class = ProjectSerializer
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    search_fields = [
        "establishment__label",
        "establishment__city__label",
        "company__label",
        "project_management__label",
        "representative__label",
    ]
    ordering_fields = [
        "establishment__codeestablishment__label",
        "establishment__city__label",
        "annee_d_individualisation",
        "annee_de_livraison",
        "company__label",
        "project_management__label",
        "montant_des_ap_votes_en_meu",
        "enveloppe_prev_en_meu",
        "notification_du_marche",
        "representative__label",
        "establishment__label",
        "establishment__city",
        "etat_d_avancement",
    ]
    filterset_fields = ["establishment__city__label", "etat_d_avancement"]

    def get_queryset(self):
        return (
            Project.objects.select_related("establishment", "representative", "project_management", "company")
            .all()
        )

    @action(detail=True, methods=["GET"], url_path="kpi")
    def kpi(self, request: Request, *args, **kwargs):
        project: Project = self.get_object()

        kpi = ProjectKpi(project)

        return Response({
            **kpi.voted_budget,
            **kpi.planned_budget,
        })
