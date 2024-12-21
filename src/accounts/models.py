from django.db import models
from django.contrib.auth.models import User
from django.utils.timezone import now

class Account(models.Model):

    name                = models.CharField(max_length=255)
    description         = models.TextField(blank=True, null=True)
    account_type        = models.TextField(default="checking")
    creation_date       = models.DateTimeField(default=now)
    modification_date   = models.DateTimeField(auto_now=True)
    balance             = models.DecimalField(max_digits=12, decimal_places=2, default=0.00)
    user                = models.ForeignKey(User, on_delete=models.CASCADE, related_name="accounts")

    def __str__(self):
        return self.name
