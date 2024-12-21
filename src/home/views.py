from django.shortcuts import render

from src.categories.models import Category
from src.accounts.models import Account

def home_view(request, *args, **kwargs):
    context = {
        "categories": Category.objects.all(),
        "accounts": Account.objects.filter(user=request.user)
    }

    return render(request, 'index.html', context)
