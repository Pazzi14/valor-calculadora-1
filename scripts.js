class EmprestimoCalculator {
    constructor() {
        this.tiposEmprestimo = {
            CREDITO_PESSOAL: { juros: 0.07, maxParcelas: 8 },
            FGTS: { juros: 0.02, maxParcelas: 84 },
            CONSIGNADO_PRIVADO: { juros: 0.05, maxParcelas: 96 },
            CONSIGNADO_PUBLICO: { juros: 0.04, maxParcelas: 96 }
        };
    }

    calcularEmprestimo(tipo, valor, parcelas) {
        if (valor < 500 || valor > 20000) {
            throw new Error("Valor do emprestimo deve ser entre R$500 e R$20.000");
        }

        const emprestimo = this.tiposEmprestimo[tipo];
        if (!emprestimo) {
            throw new Error("Tipo de emprestimo invalido");
        }

        if (parcelas > emprestimo.maxParcelas) {
            throw new Error(`Numero maximo de parcelas para ${tipo} e ${emprestimo.maxParcelas}`);
        }

        const taxaMensal = emprestimo.juros;
        const valorParcela = (valor * taxaMensal * Math.pow(1 + taxaMensal, parcelas)) / (Math.pow(1 + taxaMensal, parcelas) - 1);
        const valorTotal = valorParcela * parcelas;
        const totalJuros = valorTotal - valor;

        return {
            valorParcela: valorParcela.toFixed(2),
            valorTotal: valorTotal.toFixed(2),
            totalJuros: totalJuros.toFixed(2)
        };
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const calculator = new EmprestimoCalculator();
    const form = document.getElementById('loanForm');
    const resultDiv = document.getElementById('result');
    const errorDiv = document.getElementById('error');
    const jurosInfoP = document.getElementById('jurosInfo');

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const tipo = document.getElementById('loanType').value;
        const valor = parseFloat(document.getElementById('loanAmount').value);
        const parcelas = parseInt(document.getElementById('loanTerm').value);

        errorDiv.classList.add('hidden');
        resultDiv.classList.add('hidden');

        try {
            const resultado = calculator.calcularEmprestimo(tipo, valor, parcelas);
            
            document.getElementById('monthlyPayment').textContent = resultado.valorParcela;
            document.getElementById('totalAmount').textContent = resultado.valorTotal;
            document.getElementById('totalInterest').textContent = resultado.totalJuros;
            
            resultDiv.classList.remove('hidden');
        } catch (error) {
            errorDiv.textContent = error.message;
            errorDiv.classList.remove('hidden');
        }
    });

    document.getElementById('loanType').addEventListener('change', function() {
        const tipo = this.value;
        const emprestimo = calculator.tiposEmprestimo[tipo];
        jurosInfoP.textContent = `Taxa de juros: ${emprestimo.juros * 100}% ao mes. Maximo de ${emprestimo.maxParcelas} parcelas.`;
    });

    // Trigger the change event on page load to show initial loan info
    document.getElementById('loanType').dispatchEvent(new Event('change'));
});
