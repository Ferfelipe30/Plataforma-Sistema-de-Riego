from django.shortcuts import render, get_object_or_404
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
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