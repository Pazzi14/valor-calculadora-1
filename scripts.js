// scripts.js

document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Form submission
    const form = document.getElementById('loan-calculator');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        calculateLoan();
    });

    // Loan calculator logic
    function calculateLoan() {
        const service = document.getElementById('service').value;
        const amount = parseFloat(document.getElementById('amount').value);
        const term = parseInt(document.getElementById('term').value);
        let rate;

        switch(service) {
            case 'personal':
                rate = 7;
                if (term > 8) {
                    alert('O prazo máximo para Crédito Pessoal é de 8 meses.');
                    return;
                }
                break;
            case 'private':
                rate = 5;
                if (term > 96) {
                    alert('O prazo máximo para Consignado Privado é de 96 meses.');
                    return;
                }
                break;
            case 'public':
                rate = 4;
                if (term > 96) {
                    alert('O prazo máximo para Consignado Público é de 96 meses.');
                    return;
                }
                break;
            case 'fgts':
                rate = 2;
                if (term > 84) {
                    alert('O prazo máximo para FGTS é de 84 meses (7 anos).');
                    return;
                }
                break;
            default:
                alert('Serviço inválido.');
                return;
        }

        const monthlyRate = rate / 100 / 12;
        const payment = amount * monthlyRate * Math.pow(1 + monthlyRate, term) / (Math.pow(1 + monthlyRate, term) - 1);
        document.getElementById('result').innerText = `Pagamento mensal estimado: R$ ${payment.toFixed(2)}`;
    }
});
