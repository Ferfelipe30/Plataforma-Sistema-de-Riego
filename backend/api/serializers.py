from rest_framework import serializers
from .models import DataSensor

class DataSensorSerializer(serializers.ModelSerializer):
    class Meta:
        model = DataSensor
        fields = '__all__'