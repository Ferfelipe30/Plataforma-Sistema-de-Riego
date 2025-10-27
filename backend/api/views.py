from django.shortcuts import render, get_object_or_404
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from django.db.models import Avg, Max, Min, Count
from django.db.models.functions import TruncDate, TruncHour
from django.utils import timezone
from datetime import datetime, timedelta
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.exceptions import NotFound
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.authtoken.models import Token
from .models import DataSensor, usuarios
from .serializers import DataSensorSerializer, LoginSerializer, UsuarioSerializer

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
    
class UsuarioList(generics.ListCreateAPIView):
    queryset = usuarios.objects.all()
    serializer_class = UsuarioSerializer

    def get(self, request):
        usuarios_list = usuarios.objects.all()
        serializer = UsuarioSerializer(usuarios_list, many=True)
        if not usuarios_list:
            return NotFound('No se encontraron usuarios.')
        return Response({'success': True, 'details': 'Listado de usuarios.', 'data': serializer.data}, status=status.HTTP_200_OK)
    
class CrearUsuario(generics.CreateAPIView):
    queryset = usuarios.objects.all()
    serializer_class = UsuarioSerializer

    def post(self, request):
        serializer = UsuarioSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({'success': True, 'details': 'Usuario creado exitosamente.', 'data': serializer.data}, status=status.HTTP_201_CREATED)
    
class ActualizarUsuario(generics.UpdateAPIView):
    queryset = usuarios.objects.all()
    serializer_class = UsuarioSerializer

    def put(self, request, pk):
        usuario = get_object_or_404(usuarios, pk=pk)
        serializer = UsuarioSerializer(usuario, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({'success': True, 'details': 'Usuario actualizado exitosamente.', 'data': serializer.data}, status=status.HTTP_200_OK)
    
class EliminarUsuario(generics.DestroyAPIView):
    queryset = usuarios.objects.all()
    serializer_class = UsuarioSerializer

    def delete(self, request, pk):
        usuario = get_object_or_404(usuarios, pk=pk)
        usuario.delete()
        return Response({'success': True, 'details': 'Usuario eliminado exitosamente.'}, status=status.HTTP_204_NO_CONTENT)
    
class LoginView(generics.GenericAPIView):
    serializer_class = LoginSerializer

    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        return Response({'success': True, 'details': 'Inicio de sesión exitoso.', 'data': serializer.validated_data}, status=status.HTTP_200_OK)

@api_view(['POST'])
@permission_classes([AllowAny])
def login_view(request):
    email = request.data.get('email')
    password = request.data.get('password')
    
    if not email or not password:
        return Response(
            {'message': 'Email y contraseña son requeridos'},
            status=status.HTTP_400_BAD_REQUEST
        )
    
    try:
        user = User.objects.get(email=email)
        user = authenticate(username=user.username, password=password)
    except User.DoesNotExist:
        user = None
    
    if user is not None:
        token, created = Token.objects.get_or_create(user=user)
        return Response({
            'token': token.key,
            'user': {
                'id': user.id,
                'username': user.username,
                'email': user.email,
                'first_name': user.first_name,
                'last_name': user.last_name
            },
            'message': 'Inicio de sesión exitoso'
        })
    else:
        return Response(
            {'message': 'Credenciales inválidas'},
            status=status.HTTP_401_UNAUTHORIZED
        )
    
class AnalisisDatosSensores(generics.GenericAPIView):
    queryset = DataSensor.objects.all()
    serializer_class = DataSensorSerializer

    def get(self, request):
        fecha_inicio = request.query_params.get('fecha_inicio')
        fecha_fin = request.query_params.get('fecha_fin')
        
        queryset = DataSensor.objects.all()
        
        # Filtrar por rango de fechas si se proporcionan
        if fecha_inicio:
            queryset = queryset.filter(fecha_hora__gte=fecha_inicio)
        if fecha_fin:
            queryset = queryset.filter(fecha_hora__lte=fecha_fin)
        
        if not queryset.exists():
            return Response(
                {'success': False, 'details': 'No hay datos disponibles para el análisis.'},
                status=status.HTTP_404_NOT_FOUND
            )
        
        # Estadísticas generales
        estadisticas = {
            'temperatura_ambiental': {
                'promedio': queryset.aggregate(Avg('temperatura_ambiental'))['temperatura_ambiental__avg'],
                'maximo': queryset.aggregate(Max('temperatura_ambiental'))['temperatura_ambiental__max'],
                'minimo': queryset.aggregate(Min('temperatura_ambiental'))['temperatura_ambiental__min'],
            },
            'humedad_relativa': {
                'promedio': queryset.aggregate(Avg('humedad_relativa'))['humedad_relativa__avg'],
                'maximo': queryset.aggregate(Max('humedad_relativa'))['humedad_relativa__max'],
                'minimo': queryset.aggregate(Min('humedad_relativa'))['humedad_relativa__min'],
            },
            'humedad_suelo': {
                'promedio': queryset.aggregate(Avg('humedad_suelo'))['humedad_suelo__avg'],
                'maximo': queryset.aggregate(Max('humedad_suelo'))['humedad_suelo__max'],
                'minimo': queryset.aggregate(Min('humedad_suelo'))['humedad_suelo__min'],
            },
            'calidad_aire': {
                'promedio': queryset.aggregate(Avg('calidad_aire'))['calidad_aire__avg'],
                'maximo': queryset.aggregate(Max('calidad_aire'))['calidad_aire__max'],
                'minimo': queryset.aggregate(Min('calidad_aire'))['calidad_aire__min'],
            },
            'temperatura_agua': {
                'promedio': queryset.aggregate(Avg('temperatura_agua'))['temperatura_agua__avg'],
                'maximo': queryset.aggregate(Max('temperatura_agua'))['temperatura_agua__max'],
                'minimo': queryset.aggregate(Min('temperatura_agua'))['temperatura_agua__min'],
            }
        }
        
        # Análisis por día
        datos_por_dia = queryset.annotate(
            dia=TruncDate('fecha_hora')
        ).values('dia').annotate(
            temp_promedio=Avg('temperatura_ambiental'),
            humedad_suelo_promedio=Avg('humedad_suelo'),
            humedad_relativa_promedio=Avg('humedad_relativa'),
            lecturas=Count('ID')
        ).order_by('-dia')[:30]  # Últimos 30 días
        
        # Análisis por hora (últimas 24 horas)
        hace_24h = timezone.now() - timedelta(hours=24)
        datos_por_hora = queryset.filter(fecha_hora__gte=hace_24h).annotate(
            hora=TruncHour('fecha_hora')
        ).values('hora').annotate(
            temp_promedio=Avg('temperatura_ambiental'),
            humedad_suelo_promedio=Avg('humedad_suelo'),
            lecturas=Count('ID')
        ).order_by('hora')
        
        # Alertas y recomendaciones
        alertas = []
        ultimo_registro = queryset.latest('fecha_hora')
        
        # Verificar condiciones críticas
        if ultimo_registro.humedad_suelo < 30:
            alertas.append({
                'tipo': 'CRÍTICO',
                'sensor': 'Humedad del suelo',
                'valor': ultimo_registro.humedad_suelo,
                'mensaje': 'Nivel de humedad del suelo bajo. Se recomienda riego inmediato.'
            })
        elif ultimo_registro.humedad_suelo < 50:
            alertas.append({
                'tipo': 'ADVERTENCIA',
                'sensor': 'Humedad del suelo',
                'valor': ultimo_registro.humedad_suelo,
                'mensaje': 'Nivel de humedad del suelo moderado. Considerar riego pronto.'
            })
        
        if ultimo_registro.temperatura_ambiental > 35:
            alertas.append({
                'tipo': 'ADVERTENCIA',
                'sensor': 'Temperatura ambiental',
                'valor': ultimo_registro.temperatura_ambiental,
                'mensaje': 'Temperatura ambiental alta. Aumentar frecuencia de riego.'
            })
        
        if ultimo_registro.temperatura_agua > 28:
            alertas.append({
                'tipo': 'ADVERTENCIA',
                'sensor': 'Temperatura del agua',
                'valor': ultimo_registro.temperatura_agua,
                'mensaje': 'Temperatura del agua elevada. Verificar sistema de enfriamiento.'
            })
        
        # Respuesta completa
        respuesta = {
            'success': True,
            'details': 'Análisis de datos completado exitosamente.',
            'data': {
                'total_lecturas': queryset.count(),
                'estadisticas_generales': estadisticas,
                'tendencias_diarias': list(datos_por_dia),
                'tendencias_horarias': list(datos_por_hora),
                'ultimo_registro': DataSensorSerializer(ultimo_registro).data,
                'alertas': alertas,
                'fecha_analisis': timezone.now().isoformat()
            }
        }
        
        return Response(respuesta, status=status.HTTP_200_OK)

class ReporteEstadisticoView(generics.GenericAPIView):
    """
    Vista para generar reportes estadísticos específicos
    """
    queryset = DataSensor.objects.all()
    
    def get(self, request):
        tipo_reporte = request.query_params.get('tipo', 'semanal')  # semanal, mensual, anual
        
        if tipo_reporte == 'semanal':
            fecha_inicio = timezone.now() - timedelta(days=7)
        elif tipo_reporte == 'mensual':
            fecha_inicio = timezone.now() - timedelta(days=30)
        elif tipo_reporte == 'anual':
            fecha_inicio = timezone.now() - timedelta(days=365)
        else:
            return Response(
                {'success': False, 'details': 'Tipo de reporte no válido.'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        queryset = DataSensor.objects.filter(fecha_hora__gte=fecha_inicio)
        
        if not queryset.exists():
            return Response(
                {'success': False, 'details': 'No hay datos disponibles para el período seleccionado.'},
                status=status.HTTP_404_NOT_FOUND
            )
        
        # Cálculo de eficiencia del sistema
        lecturas_optimas = queryset.filter(
            humedad_suelo__gte=50,
            humedad_suelo__lte=80,
            temperatura_ambiental__gte=15,
            temperatura_ambiental__lte=30
        ).count()
        
        eficiencia = (lecturas_optimas / queryset.count()) * 100 if queryset.count() > 0 else 0
        
        reporte = {
            'tipo_reporte': tipo_reporte,
            'periodo': {
                'fecha_inicio': fecha_inicio.isoformat(),
                'fecha_fin': timezone.now().isoformat()
            },
            'total_lecturas': queryset.count(),
            'lecturas_optimas': lecturas_optimas,
            'eficiencia_sistema': round(eficiencia, 2),
            'promedios': {
                'temperatura_ambiental': round(queryset.aggregate(Avg('temperatura_ambiental'))['temperatura_ambiental__avg'] or 0, 2),
                'humedad_suelo': round(queryset.aggregate(Avg('humedad_suelo'))['humedad_suelo__avg'] or 0, 2),
                'humedad_relativa': round(queryset.aggregate(Avg('humedad_relativa'))['humedad_relativa__avg'] or 0, 2),
            }
        }
        
        return Response({
            'success': True,
            'details': f'Reporte {tipo_reporte} generado exitosamente.',
            'data': reporte
        }, status=status.HTTP_200_OK)