from django.db import models

# Create your models here.
class DataEntry(models.Model):
    name = models.CharField(max_length=100)
    age = models.IntegerField()
    gender = models.CharField(max_length=10)
    salary = models.DecimalField(max_digits=10, decimal_places=2)