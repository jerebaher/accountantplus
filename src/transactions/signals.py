from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver
from .models import Transaction

@receiver(post_save, sender=Transaction)
def update_account_balance_on_save(sender, instance, **kwargs):
    txn = instance
    txn_account = txn.account

    if txn.pk:
        old_transaction = Transaction.objects.get(pk=txn.pk)
        balance_change = txn.amount - old_transaction.amount
        if txn.transaction_type == 'expense':
            balance_change *= -1
    else:
        balance_change = -txn.amount if txn.transaction_type == 'expense' else txn.amount

    txn_account.balance += balance_change
    txn_account.save()

@receiver(post_delete, sender=Transaction)
def update_account_balance_on_delete(sender, instance, **kwargs):
    account = instance.account
    if instance.transaction_type == 'expense':
        account.balance += instance.amount
    else:
        account.balance -= instance.amount
    account.save()
