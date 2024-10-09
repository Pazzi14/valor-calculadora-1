class EmprestimoCalculator {
    constructor() {
        this.tiposEmprestimo = {
            CREDITO_PESSOAL: { juros: 0.07, maxParcelas: 8 },
            FGTS: { juros: 0.02, maxParcelas: 84 }, // 7 anos = 84 meses
            CONSIGNADO_PRIVADO: { juros: 0.05, maxParcelas: 96 },
            CONSIGNADO_PUBLICO: { juros: 0.04, maxParcelas: 96 }
        };
    }

    calcularEmprestimo(tipo, valor, parcelas) {
        if (valor < 500 || valor > 20000) {
            throw new Error("Valor do empréstimo deve ser entre R$500 e R$20.000");
        }

        const emprestimo = this.tiposEmprestimo[tipo];
        if (!emprestimo) {
            throw new Error("Tipo de empréstimo inválido");
        }

        if (parcelas > emprestimo.maxParcelas) {
            throw new Error(`Número máximo de parcelas para ${this.getNomeTipoEmprestimo(tipo)} é ${emprestimo.maxParcelas}`);
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

    getNomeTipoEmprestimo(tipo) {
        switch (tipo) {
            case 'CREDITO_PESSOAL': return 'Crédito Pessoal';
            case 'FGTS': return 'FGTS';
            case 'CONSIGNADO_PRIVADO': return 'Consignado Privado';
            case 'CONSIGNADO_PUBLICO': return 'Consignado Público';
            default: return tipo;
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('loanForm');
    const result = document.getElementById('result');
    const error = document.getElementById('error');
    const calculator = new EmprestimoCalculator();

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        result.classList.add('hidden');
        error.classList.add('hidden');

        const tipo = document.getElementById('loanType').value;
        const valor = parseFloat(document.getElementById('loanAmount').value);
        const parcelas = parseInt(document.getElementById('loanTerm').value);

        try {
            const resultado = calculator.calcularEmprestimo(tipo, valor, parcelas);
            document.getElementById('monthlyPayment').textContent = resultado.valorParcela;
            document.getElementById('totalAmount').textContent = resultado.valorTotal;
            document.getElementById('totalInterest').textContent = resultado.totalJuros;
            result.classList.remove('hidden');
        } catch (err) {
            error.textContent = err.message;
            error.classList.remove('hidden');
        }
    });

    // Atualizar o número máximo de parcelas com base no tipo de empréstimo selecionado
    document.getElementById('loanType').addEventListener('change', (e) => {
        const tipo = e.target.value;
        const maxParcelas = calculator.tiposEmprestimo[tipo].maxParcelas;
        const juros = calculator.tiposEmprestimo[tipo].juros * 100;
        document.getElementById('loanTerm').max = maxParcelas;
        document.getElementById('loanTerm').placeholder = `Máximo: ${maxParcelas}`;
        document.getElementById('jurosInfo').textContent = `Taxa de juros: ${juros}% ao mês`;
    });

    // Inicializar o placeholder do número de parcelas e informações de juros
    const initialTipo = document.getElementById('loanType').value;
    const initialMaxParcelas = calculator.tiposEmprestimo[initialTipo].maxParcelas;
    const initialJuros = calculator.tiposEmprestimo[initialTipo].juros * 100;
    document.getElementById('loanTerm').placeholder = `Máximo: ${initialMaxParcelas}`;
    document.getElementById('jurosInfo').textContent = `Taxa de juros: ${initialJuros}% ao mês`;
});
