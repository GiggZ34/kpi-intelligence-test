from django.urls import path
from rest_framework.routers import SimpleRouter

from api.views import ProjectViewSet, CityViewSet

router = SimpleRouter(trailing_slash=False)
router.register("projects", ProjectViewSet, basename="projects")
router.register("cities", CityViewSet, basename="cities")


urlpatterns = [] + router.urls
