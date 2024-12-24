from datetime import date

from django.shortcuts import render

from src.categories.models import Category
from src.accounts.models import Account
from src.transactions.models import Transaction

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

def transactions_view(request, *args, **kwargs):
    transactions = (Transaction.objects
                    .filter(account__user=request.user)
                    .order_by('-creation_date'))

    transaction_categories = transactions.values_list('categories', flat=True)

    context = {
        "transactions": transactions,
        "categories": transaction_categories,
    }

    return render(request, 'transaction_page.html', context)
