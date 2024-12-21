"""
URL configuration for accountant project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from src.accounts.views import accounts_balance_data, create_account
from src.transactions.views import expense_flow_data, create_transaction
from src.categories.views import add_category
from src.home.views import home_view

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/accounts/balance/', accounts_balance_data, name='accounts_balance_data'),
    path('api/transactions/expenses/', expense_flow_data, name='expense_flow_data'),
    path('api/transactions/', create_transaction, name='create_transaction'),
    path('api/accounts/', create_account, name='create_account'),
    path('api/categories/', add_category, name='add_category'),
    path('', home_view, name='home'),
]
