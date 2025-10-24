from django.db import models

class DataSensor(models.Model):
    ID = models.AutoField(primary_key=True, editable=False, db_column='ID')
    temperatura_ambiental = models.FloatField(db_column='temperatura-ambiental')
    humedad_relativa = models.FloatField(db_column='humedad-relativa')
    humedad_suelo = models.FloatField(db_column='humedad-suelo')
    calidad_aire = models.FloatField(db_column='calidad-aire')
    temperatura_agua = models.FloatField(db_column='temperatura-agua')
    fecha_hora = models.DateTimeField(auto_now_add=True, db_column='fecha y hora')

    def __str__(self):
        return f"DataSensor {self.ID} - {self.fecha_hora}"
    
    class Meta:
        db_table = 'datos-sensores'
        verbose_name = 'Dato-Sensor'
        verbose_name_plural = 'Datos-Sensores'

class usuarios(models.Model):
    id = models.AutoField(primary_key=True, editable=False)
    nombre = models.CharField(max_length=100)
    apellido = models.CharField(max_length=100)
    email = models.EmailField(max_length=100)
    password = models.CharField(max_length=100)
    telefono = models.CharField(max_length=15)
    fecha_registro = models.DateTimeField(auto_now_add=True)
    fecha_actualizacion = models.DateTimeField(auto_now=True)
    activo = models.BooleanField(default=True)
    ultima_sesion = models.DateTimeField(null=True, blank=True)

    def check_password(self, raw_password):
        return self.password == raw_password

    def __str__(self):
        return f"Usuario {self.nombre} {self.apellido} - {self.email}"
    
    class Meta:
        db_table = 'usuarios'
        verbose_name = 'Usuario'
        verbose_name_plural = 'Usuarios'