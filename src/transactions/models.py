from django.db import models
from django.utils.timezone import now

from src.accounts.models import Account
from src.categories.models import Category

class Transaction(models.Model):
    TRANSACTION_TYPE_CHOICES = [
        ('income', 'Income'),
        ('expense', 'Expense'),
    ]

    name                = models.CharField(max_length=255, null=False, blank=False)
    description         = models.TextField(blank=True, null=True)
    amount              = models.DecimalField(max_digits=12, decimal_places=2)
    creation_date       = models.DateTimeField(default=now)
    update_date         = models.DateTimeField(auto_now=True)
    transaction_type    = models.CharField(max_length=50, choices=TRANSACTION_TYPE_CHOICES)
    account             = models.ForeignKey(
        Account,
        on_delete=models.CASCADE,
        related_name="transactions"
    )
    categories          = models.ManyToManyField(Category, related_name='transactions')

    def __str__(self):
        return f"{self.name} ({self.transaction_type})"

    def get_category_names(self):
        return ", ".join(category.name for category in self.categories.all())