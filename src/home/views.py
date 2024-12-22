from datetime import date

from django.shortcuts import render

from src.categories.models import Category
from src.accounts.models import Account

def home_view(request, *args, **kwargs):
    account_types = [
        {"id": "checking", "name": "Cuenta corriente"},
        {"id": "savings", "name": "Cuenta de ahorro"},
        {"id": "cash", "name": "Efectivo"},
        {"id": "other", "name": "Otra cuenta"}
    ]

    context = {
        "categories": Category.objects.all(),
        "accounts": Account.objects.filter(user=request.user),
        "account_types": account_types,
    }

    return render(request, 'index.html', context)
