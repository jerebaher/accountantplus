from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver
from .models import Transaction

@receiver(post_save, sender=Transaction)
def update_account_balance_on_save(sender, instance, **kwargs):
    balance_change = -instance.amount if instance.transaction_type == 'expense' \
        else instance.amount

    account = instance.account

    account.balance += balance_change
    account.save()

@receiver(post_delete, sender=Transaction)
def update_account_balance_on_delete(sender, instance, **kwargs):
    account = instance.account

    account.balance = instance.amount if instance.transaction_type == 'expense' \
        else -instance.amount

    account.save()
