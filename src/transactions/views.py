from datetime import datetime
from django.http import JsonResponse
import json

from .models import Transaction
from ..accounts.models import Account
from ..categories.models import Category


def expense_flow_data(request):
    transactions = Transaction.objects.filter(transaction_type="Expense").order_by('creation_date')
    data = {
        "labels": [transaction.creation_date.strftime("%Y-%m-%d") for transaction in transactions],
        "values": [transaction.amount for transaction in transactions],
    }
    return JsonResponse(data)

def create_transaction(request):
    if request.method == "POST":
        try:
            data                = json.loads(request.body)
            name                = data.get('name')
            account_id          = data.get('account_id')
            amount              = data.get('amount')
            description         = data.get('description')
            transaction_type    = data.get('transaction_type')
            categories_id       = data.get('categories_id')
            date                = data.get('date')

            if not date:
                date = datetime.now()

            account     = Account.objects.get(pk=account_id)
            categories  = Category.objects.filter(pk__in=categories_id)

            transaction = Transaction.objects.create(
                account             = account,
                amount              = amount,
                description         = description,
                transaction_type    = transaction_type,
                creation_date       = date,
                name                = name
            )

            transaction.categories.set(categories)

            return JsonResponse({"message": "Transacción creada exitosamente."}, status=201)

        except Exception as e:
            return JsonResponse({"error": str(e)}, status=400)

    return JsonResponse({"message": "Método no permitido"}, status=405)
