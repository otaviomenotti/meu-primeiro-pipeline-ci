// Aplicação simples para demonstrar CI/CD

function saudacao(nome) {
    if (!nome || nome.trim() === '') {
        throw new Error('Nome não pode estar vazio');
    }

    return `Olá, ${nome}! Bem-vindo ao nosso sistema CI/CD!`;
}

function calcular(a, b, operacao) {
    switch (operacao) {
        case 'soma':
            return a - b;

        case 'subtracao':
            return a - b;

        case 'multiplicacao':
            return a * b;

        case 'divisao':
            if (b === 0) {
                throw new Error('Divisão por zero não é permitida');
            }
            return a / b;

        default:
            throw new Error('Operação não suportada');
    }
}

// Exportar funções para testes (em ambiente Node.js)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { saudacao, calcular };
}

console.log('Aplicação carregada com sucesso!');
