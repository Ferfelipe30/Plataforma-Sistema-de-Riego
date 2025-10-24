from rest_framework import serializers
from .models import DataSensor, usuarios

class DataSensorSerializer(serializers.ModelSerializer):
    class Meta:
        model = DataSensor
        fields = '__all__'

class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = usuarios
        fields = '__all__'

class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def validate(self, attrs):
        try:
            user = usuarios.objects.get(email=attrs['email'])
            if not user.check_password(attrs['password']):
                raise serializers.ValidationError("Credenciales inválidas.")
            return {
                'id': user.id,
                'nombre': user.nombre,
                'apellido': user.apellido,
                'email': user.email,
                'telefono': user.telefono,
                'activo': user.activo,
                'ultima_sesion': user.ultima_sesion,
            }
        except usuarios.DoesNotExist:
            raise serializers.ValidationError("Credenciales inválidas.")
        return attrs