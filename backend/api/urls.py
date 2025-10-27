from django.urls import path
from .views import (
    DataSensorList, CrearDataSensor, ActualizarDataSensor, EliminarDataSensor,
    UsuarioList, CrearUsuario, ActualizarUsuario, EliminarUsuario, LoginView,
    AnalisisDatosSensores, ReporteEstadisticoView
)

urlpatterns = [
    path("data/", DataSensorList.as_view()),
    path("data/crear/", CrearDataSensor.as_view()),
    path("data/actualizar/<int:pk>/", ActualizarDataSensor.as_view()),
    path("data/eliminar/<int:pk>/", EliminarDataSensor.as_view()),
    path("data/analisis/", AnalisisDatosSensores.as_view()),
    path("data/reporte/", ReporteEstadisticoView.as_view()),
    path("usuarios/", UsuarioList.as_view()),
    path("usuarios/crear/", CrearUsuario.as_view()),
    path("usuarios/actualizar/<int:pk>/", ActualizarUsuario.as_view()),
    path("usuarios/eliminar/<int:pk>/", EliminarUsuario.as_view()),
    path("login/", LoginView.as_view()),
]