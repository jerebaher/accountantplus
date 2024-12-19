from django.http import JsonResponse
from .models import Account

def accounts_balance_data(request):
    accounts = Account.objects.all()
    data = {
        "labels": [accounts.name for accounts in accounts],
        "values": [accounts.balance for accounts in accounts],
    }
    print(accounts)
    print(data)
    return JsonResponse(data)
