from rest_framework.viewsets import GenericViewSet, mixins

from api.models import City
from api.serializers import CitySerializer


class CityViewSet(GenericViewSet, mixins.ListModelMixin):
    pagination_class = None
    queryset = City.objects.all()
    serializer_class = CitySerializer
