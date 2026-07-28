// Sistema de testes automatizados

const { saudacao, calcular } = require('./app.js');

// Contador de testes
let testesExecutados = 0;
let testesPassaram = 0;
let testesFalharam = 0;

// Função auxiliar para executar testes
function executarTeste(nome, funcaoTeste) {
    testesExecutados++;

    try {
        funcaoTeste();
        console.log(`PASSOU: ${nome}`);
        testesPassaram++;
    } catch (error) {
        console.log(`FALHOU: ${nome}`);
        console.log(`   Erro: ${error.message}`);
        testesFalharam++;
    }
}

// Função auxiliar para verificar igualdade
function assertEqual(atual, esperado, mensagem = '') {
    if (atual !== esperado) {
        throw new Error(`${mensagem} - Esperado: ${esperado}, Atual: ${atual}`);
    }
}

// Função auxiliar para verificar se uma função lança erro
function assertThrows(funcao, mensagemEsperada = '') {
    try {
        funcao();
        throw new Error('Esperava que a função lançasse um erro, mas não lançou');
    } catch (error) {
        if (mensagemEsperada && !error.message.includes(mensagemEsperada)) {
            throw new Error(
                `Erro lançado, mas mensagem incorreta. Esperado: "${mensagemEsperada}", Atual: "${error.message}"`
            );
        }
    }
}

console.log('Iniciando bateria de testes automatizados...\n');

// ================================
// TESTES DA FUNÇÃO SAUDACAO
// ================================

console.log('Testando função saudacao():');

executarTeste('Saudação com nome válido', () => {
    const resultado = saudacao('João');
    assertEqual(resultado, 'Olá, João! Bem-vindo ao nosso sistema CI/CD!');
});

executarTeste('Saudação com nome vazio deve falhar', () => {
    assertThrows(() => saudacao(''), 'Nome não pode estar vazio');
});

executarTeste('Saudação com null deve falhar', () => {
    assertThrows(() => saudacao(null), 'Nome não pode estar vazio');
});

// ================================
// TESTES DA FUNÇÃO CALCULAR
// ================================

console.log('\nTestando função calcular():');

executarTeste('Soma: 2 + 3 = 5', () => {
    assertEqual(calcular(2, 3, 'soma'), 5);
});

executarTeste('Divisão por zero deve falhar', () => {
    assertThrows(
        () => calcular(10, 0, 'divisao'),
        'Divisão por zero não é permitida'
    );
});

// ================================
// RELATÓRIO FINAL
// ================================

console.log('\nRELATÓRIO FINAL DOS TESTES:');
console.log(`Total de testes: ${testesExecutados}`);
console.log(`Passaram: ${testesPassaram}`);
console.log(`Falharam: ${testesFalharam}`);

if (testesFalharam > 0) {
    console.log('\nATENÇÃO: Alguns testes falharam! O código precisa ser corrigido.');
    process.exit(1); // Sai com código de erro
} else {
    console.log('\nSUCESSO: Todos os testes passaram! O código está funcionando corretamente.');
    process.exit(0); // Sai com código de sucesso
}
