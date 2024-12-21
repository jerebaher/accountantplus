document.addEventListener('DOMContentLoaded', async function renderAccountsBalanceChart() {
    const response = await fetch('/api/accounts/balance/');
    const data = await response.json();

    if (!data || !data.labels || !data.values) {
        console.error('Los datos recibidos no son válidos:', data);
        return;
    }

    const ctx = document.getElementById('accountsBalanceChart').getContext('2d');
    const ctxPie = document.getElementById('accountsBalanceChartPie').getContext('2d');
    const colors = generateColors(data.values.length);

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

    new Chart(ctxPie, {
        type: 'pie',
        data: {
            labels: data.labels,
            datasets: [{
                label: 'Saldo por cuenta',
                data: data.values,
                backgroundColor: colors,
                borderColor: colors.map(color => color.replace(/0\.6\)$/, "1)")),
                borderWidth: 1
            }]
        },
        options: {
            responsive: false,
        }
    });
});


const generateColors = (count) => {
    const baseColor = [75, 192, 192];
    return Array.from({length: count}, (_, i) => {
        const factor = i / count;
        const r = Math.min(255, baseColor[0] + factor * 30);
        const g = Math.max(0, baseColor[1] - factor * 40);
        const b = Math.max(0, baseColor[2] - factor * 20);
        return `rgba(${r.toFixed(0)}, ${g.toFixed(0)}, ${b.toFixed(0)}, 0.6)`;
    });
}