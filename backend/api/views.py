from django.shortcuts import render, get_object_or_404
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.exceptions import NotFound
from .models import DataSensor
from .serializers import DataSensorSerializer

class DataSensorList(generics.ListCreateAPIView):
    queryset = DataSensor.objects.all()
    serializer_class = DataSensorSerializer

    def get(self, request):
        datos = DataSensor.objects.all()
        serializer = DataSensorSerializer(datos, many=True)
        if not datos:
            return NotFound('No se encontraron datos.')
        return Response({'success': True, 'details': 'Listados de los datos.', 'data': serializer.data}, status=status.HTTP_200_OK)
    
class CrearDataSensor(generics.CreateAPIView):
    queryset = DataSensor.objects.all()
    serializer_class = DataSensorSerializer

    def post(self, request):
        serializer = DataSensorSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({'success': True, 'details': 'Datos creados exitosamente.', 'data': serializer.data}, status=status.HTTP_201_CREATED)
    
class ActualizarDataSensor(generics.UpdateAPIView):
    queryset = DataSensor.objects.all()
    serializer_class = DataSensorSerializer

    def put(self, request, pk):
        dato = get_object_or_404(DataSensor, pk=pk)
        serializer = DataSensorSerializer(dato, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({'success': True, 'details': 'Datos actualizados exitosamente.', 'data': serializer.data}, status=status.HTTP_200_OK)
    
class EliminarDataSensor(generics.DestroyAPIView):
    queryset = DataSensor.objects.all()
    serializer_class = DataSensorSerializer

    def delete(self, request, pk):
        dato = get_object_or_404(DataSensor, pk=pk)
        dato.delete()
        return Response({'success': True, 'details': 'Datos eliminados exitosamente.'}, status=status.HTTP_204_NO_CONTENT)