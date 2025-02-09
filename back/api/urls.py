from rest_framework.routers import SimpleRouter

from api.views import CityViewSet, EstablishmentViewSet, ProjectViewSet

router = SimpleRouter(trailing_slash=False)
router.register("projects", ProjectViewSet, basename="projects")
router.register("cities", CityViewSet, basename="cities")
router.register("establishments", EstablishmentViewSet, basename="establishments")

urlpatterns = [] + router.urls
