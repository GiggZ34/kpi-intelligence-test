from django_filters.rest_framework import DjangoFilterBackend, FilterSet
from rest_framework.filters import OrderingFilter, SearchFilter
from rest_framework.viewsets import GenericViewSet, mixins

from api.models import Project, City
from api.serializers import ProjectSerializer, CitySerializer


class ProjectViewSet(GenericViewSet, mixins.ListModelMixin, mixins.RetrieveModelMixin):
    serializer_class = ProjectSerializer
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    search_fields = [
        "establishment__label",
        "establishment__city",
        "company__label",
        "project_management__label",
        "representative__label",
    ]
    ordering_fields = [
        "annee_d_individualisation",
        "annee_de_livraison",
        "company__label",
        "project_management__label",
        "representative__label",
        "establishment__label",
        "establishment__city"
    ]
    filterset_fields = [
        "establishment__city",
        "etat_d_avancement"
    ]

    def get_queryset(self):
        return Project.objects.select_related(
            "establishment", "representative", "project_management", "company"
        ).all()


class CityViewSet(GenericViewSet, mixins.ListModelMixin):
    pagination_class = None
    queryset = City.objects.all()
    serializer_class = CitySerializer