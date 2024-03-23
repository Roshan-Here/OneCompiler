from django.db import models

# Create your models here.

class OneCode(models.Model):
    run_time = models.DateTimeField(null=True,blank=True)
    code = models.TextField()
    memory_usage = models.BigIntegerField(blank=True,null=True)