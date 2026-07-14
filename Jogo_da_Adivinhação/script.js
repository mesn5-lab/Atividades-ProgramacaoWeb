const inputPalpite = document.getElementById('game-input');
const botaoJogar = document.getElementById('start-button');
const containerResultado = document.getElementById('initial-message');

let numeroSecreto = Math.floor(Math.random() * 50) + 1;
let tentativas = 0;
let jogoFinalizado = false;

botaoJogar.addEventListener('click', () => {
    if (jogoFinalizado) {
        numeroSecreto = Math.floor(Math.random() * 50) + 1;
        tentativas = 0;
        jogoFinalizado = false;
        inputPalpite.disabled = false;
        inputPalpite.value = '';
        return; 
    }

    const entradaTexto = inputPalpite.value.trim();

    const palpite = Number(entradaTexto);

    if (entradaTexto === '' || isNaN(palpite)) {
        containerResultado.innerHTML = `<p class="error-message">Por favor, insira um valor numérico válido.</p>`;
        return;
    }

    tentativas++;

    if (palpite < 1 || palpite > 50) {
        containerResultado.innerHTML = `<p class="error-message">Aviso: O número secreto está estritamente entre 1 e 50.</p>`;
    } else if (palpite < numeroSecreto) {
        containerResultado.innerHTML = `<p class="error-message">O número secreto é MAIOR que ${palpite}! (Tentativa ${tentativas})</p>`;
        inputPalpite.value = ''; 
    } else if (palpite > numeroSecreto) {
        containerResultado.innerHTML = `<p class="error-message">O número secreto é MENOR que ${palpite}! (Tentativa ${tentativas})</p>`;
        inputPalpite.value = ''; 
        
        containerResultado.innerHTML = `
            <h2>Vitória!</h2>
               <p><strong>Número Secreto:</strong> ${numeroSecreto}</p>
               <p><strong>Total de Tentativas:</strong> ${tentativas}</p>
               <p><strong>Status do Jogo:</strong> Concluído</p>
        `;

        jogoFinalizado = true;
        botaoJogar.textContent = "Reiniciar";
        inputPalpite.disabled = true;
        inputPalpite.value = '';
    }
});