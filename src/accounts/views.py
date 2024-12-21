from django.contrib.auth.models import User
from django.http import JsonResponse
import json

from .models import Account

def accounts_balance_data(request):
    accounts = Account.objects.all()
    data = {
        "labels": [accounts.name for accounts in accounts],
        "values": [accounts.balance for accounts in accounts],
    }
    return JsonResponse(data)

def create_account(request):
    if request.method == "POST":
        try:
            data            = json.loads(request.body)
            name            = data.get('name')
            description     = data.get('description')
            account_type    = data.get('account_type')
            balance         = data.get('balance')
            user            = User.objects.get(pk=request.user.id)

            if not name or not account_type or balance is None:
                return JsonResponse({"error": "Faltan datos obligatorios"}, status=400)

            try:
                balance = float(balance)
            except ValueError:
                return JsonResponse({"error": "El saldo inicial debe ser un número válido"}, status=400)

            account = Account.objects.create(
                name            = name,
                account_type    = account_type,
                balance         = balance,
                description     = description,
                user            = user
            )

            return JsonResponse({"message": "Cuenta creada exitosamente.", "account_id": account.id}, status=201)

        except Exception as e:
            return JsonResponse({"error": str(e)}, status=400)

    return JsonResponse({"message": "Método no permitido"}, status=405)