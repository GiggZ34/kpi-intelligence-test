from rest_framework import serializers

from api.models import City


class CitySerializer(serializers.ModelSerializer):
    class Meta:
        model = City
        fields = [
            "label",
        ]
