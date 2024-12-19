document.addEventListener('DOMContentLoaded', async function renderAccountsBalanceChart() {
    const response = await fetch('/api/accounts/balance/');
    const data = await response.json();

     if (!data || !data.labels || !data.values) {
        console.error('Los datos recibidos no son válidos:', data);
        return;
     }

    const ctx = document.getElementById('accountsBalanceChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: data.labels,
            datasets: [{
                label: 'Saldo por cuenta',
                data: data.values,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: false,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    console.log(data);
    console.log("hollaaa");
});
