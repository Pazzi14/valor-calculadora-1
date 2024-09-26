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
    const form = document.getElementById('contact-form');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        // Here you would typically send the form data to a server
        alert('Obrigado por entrar em contato! Retornaremos em breve.');
        form.reset();
    });

    // Simple loan calculator (you can expand on this)
    const calculateLoan = (amount, rate, term) => {
        const monthlyRate = rate / 100 / 12;
        const payment = amount * monthlyRate * Math.pow(1 + monthlyRate, term) / (Math.pow(1 + monthlyRate, term) - 1);
        return payment.toFixed(2);
    };

    // Example usage:
    console.log(`Pagamento mensal estimado: R$ ${calculateLoan(10000, 7, 8)}`);
});
