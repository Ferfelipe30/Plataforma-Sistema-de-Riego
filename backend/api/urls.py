from django.urls import path
from .views import (
    DataSensorList, CrearDataSensor, ActualizarDataSensor, EliminarDataSensor
)

urlpatterns = [
    path("data/", DataSensorList.as_view()),
    path("data/crear/", CrearDataSensor.as_view()),
    path("data/actualizar/<int:pk>/", ActualizarDataSensor.as_view()),
    path("data/eliminar/<int:pk>/", EliminarDataSensor.as_view()),
]