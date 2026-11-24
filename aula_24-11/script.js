// Combinações de índices que dão a vitória (linhas, colunas e diagonais)
const COMBINACOES = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6],
];

// Captura dos elementos do DOM
const celulas = document.querySelectorAll('.celula');
const statusTexto = document.getElementById('status');
const botaoReiniciar = document.getElementById('reiniciar');
const placar = {
    X: document.getElementById('placar-x'),
    O: document.getElementById('placar-o'),
    empates: document.getElementById('placar-empates'),
};

// Variáveis de estado do jogo
let tabuleiro = Array(9).fill('');
let jogadorAtual = 'X';
let jogoAtivo = true;
const pontos = { X: 0, O: 0, empates: 0 };

// =========================================================================
// ETAPA 3 (1,0 pt): Marcar jogadas e alternar turnos
// =========================================================================
function jogar(indice) {
    // 1. Impedir jogada se o jogo acabou ou se a célula já está preenchida
    if (!jogoAtivo || tabuleiro[indice] !== '') return;

    // TODO: Salvar jogadorAtual no array 'tabuleiro' na posição 'indice'
    // TODO: Mostrar o símbolo ('X' ou 'O') na célula clicada (textContent)
    // TODO: Adicionar a classe CSS 'x' ou 'o' na célula (classList.add)
    // TODO: Desabilitar a célula clicada (disabled = true)

    // Verificação de fim de jogo (será completada na Etapa 4)
    const combinacao = buscarVencedor();

    if (combinacao) {
        finalizar(`Jogador ${jogadorAtual} venceu! 🎉`);
        // TODO (Etapa 4): Adicionar a classe 'vencedora' nas 3 células da 'combinacao'
        pontos[jogadorAtual]++;
    } else if (!tabuleiro.includes('')) {
        finalizar('Deu velha! Empate.');
        pontos.empates++;
    } else {
        // TODO (Etapa 3): Alternar jogadorAtual entre 'X' e 'O'
        // TODO (Etapa 3): Atualizar o statusTexto para "Vez do jogador X" (ou O)
    }

    atualizarPlacar();
}

// =========================================================================
// ETAPA 4 (1,0 pt): Verificar vitória e encerrar partida
// =========================================================================
function buscarVencedor() {
    // TODO: Percorrer a matriz COMBINACOES com um laço 'for' tradicional.
    // A cada volta, verificar se as três posições do trio no 'tabuleiro'
    // (combinacao[0], combinacao[1] e combinacao[2]) não estão vazias (!== '')
    // e possuem o mesmo símbolo. Se encontrar, retornar essa combinação.
    for(let i = 0; i < COMBINACOES.length; i++){
        const combinacao = COMBINACOES[i];

        const a = combinacao[0];
        const b = combinacao[1];
        const c = combinacao[2];

        if(tabuleiro[a] !== '' && tabuleiro[a] === tabuleiro[b] && tabuleiro[b] === tabuleiro[c]){
            return combinacao;
        }
    }
    return null;
}

function finalizar(mensagem) {
    // TODO: Definir jogoAtivo como false
    // TODO: Exibir a 'mensagem' no statusTexto
    // TODO: Desabilitar todas as células do tabuleiro

    jogoAtivo = false;

    statusTexto.textContent = mensagem;

    celulas.forEach((celula) => {
        celula.disabled = true;
    });
}

// =========================================================================
// ETAPA 5 (1,0 pt): Atualizar placar e reiniciar partida
// =========================================================================
function atualizarPlacar() {
    // TODO: Atualizar textContent de placar.X, placar.O e placar.empates

    placar.X.textContent = pontos.X;
    placar.O.textContent = pontos.O;
    placar.empates.textContent = placar.empates;
}

function iniciarPartida() {
    // TODO: Resetar 'tabuleiro' para 9 posições vazias ('')
    // TODO: Resetar 'jogadorAtual' para 'X' e 'jogoAtivo' para true
    // TODO: Limpar texto, classes ('x', 'o', 'vencedora') e reabilitar todas as células
    // TODO: Atualizar statusTexto para "Vez do jogador X"

    tabuleiro = Array(9).fill('');
    jogadorAtual = 'X';
    jogoAtivo = true;

    celulas.forEach((celula) => {
        celula.textContent = '';
        celula.classList.remove('x', 'o', 'vencedora');
        celula.disabled = false;
    });

    statusTexto.textContent = 'Vez do jogador X';
}

// Eventos de clique (já configurados)
celulas.forEach((celula) => {
    celula.addEventListener('click', () => jogar(Number(celula.dataset.indice)));
});

botaoReiniciar.addEventListener('click', iniciarPartida);