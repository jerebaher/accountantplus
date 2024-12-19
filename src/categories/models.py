from django.db import models

class Category(models.Model):
    name                = models.CharField(max_length=50)
    description         = models.TextField(blank=True, null=True)
    creation_date       = models.DateTimeField(auto_now_add=True)
    modification_date   = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name
