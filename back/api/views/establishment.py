from django.db.models import OuterRef, Prefetch, QuerySet, Sum
from django_filters import CharFilter
from django_filters.rest_framework import DjangoFilterBackend, FilterSet
from rest_framework.decorators import action
from rest_framework.filters import OrderingFilter, SearchFilter
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet, mixins

from api.models import Establishment, Project
from api.serializers import EstablishmentSerializer
from utils.functions_orm import SubqueryCount


class EstablishmentFilterSet(FilterSet):
    status = CharFilter(method="byStatus", required=False)
    city = CharFilter(field_name="city_id", lookup_expr="iexact")

    class Meta:
        model = Establishment
        fields = ["status", "city"]

    def byStatus(self, queryset, name, value):
        return queryset.filter(projects__etat_d_avancement__contains=value)


class EstablishmentViewSet(
    GenericViewSet, mixins.ListModelMixin, mixins.RetrieveModelMixin
):
    lookup_field = "code"
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    search_fields = [
        "code",
        "label",
        "city__label",
        "projects__company__label",
        "projects__project_management__label",
        "projects__representative__label",
    ]
    ordering_fields = [
        "code",
        "label",
    ]
    filterset_class = EstablishmentFilterSet
    serializer_class = EstablishmentSerializer

    def get_queryset(self):
        project_filter = {}
        if "status" in self.request.query_params:
            project_filter["etat_d_avancement"] = self.request.query_params.get(
                "status"
            )

        queryset = (
            Establishment.objects.prefetch_related(
                Prefetch(
                    lookup="projects",
                    queryset=Project.objects.select_related(
                        "representative", "project_management", "company"
                    ),
                )
            )
            .annotate(
                project_count=SubqueryCount(
                    Project.objects.filter(
                        establishment_id=OuterRef("code"), **project_filter
                    )
                )
            )
            .order_by("label")
            .distinct()
        )
        return queryset
