from django.shortcuts import render

from src.categories.models import Category

def home_view(request, *args, **kwargs):
    context = {"categories": Category.objects.all()}

    return render(request, 'index.html', context)
