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