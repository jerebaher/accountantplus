from .models import Transaction
from django.http import JsonResponse

def expense_flow_data(request):
    transactions = Transaction.objects.filter(transaction_type="Expense").order_by('creation_date')
    data = {
        "labels": [transaction.creation_date.strftime("%Y-%m-%d") for transaction in transactions],
        "values": [transaction.amount for transaction in transactions],
    }
    return JsonResponse(data)

