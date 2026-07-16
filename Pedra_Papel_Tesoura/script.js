function abrirPainel() {
    document.getElementById("btn-jogar").classList.add("oculto");

    const campo = document.getElementById("campoJogador");
    campo.value = "";
    document.getElementById("painel").classList.remove("oculto");    
}

function cancelarJogada() {
    document.getElementById("painel").classList.add("oculto");
    document.getElementById("btn-jogar").classList.remove("oculto");
}

function reiniciarArena() {
    document.getElementById("resultado").classList.add("oculto");
    document.getElementById("btn-jogar").classList.remove("oculto");
}

function processarJogada() {
    const entradaJogador = document.getElementById("campoJogador").value;
    const escolhaJogador = entradaJogador.toLowerCase().trim();

    if(!(escolhaJogador === "pedra" || escolhaJogador === "papel" || escolhaJogador === "tesoura")) {
        document.getElementById("painel").classList.add("oculto");
        document.getElementById("textoResultado").innerHTML = "Opção inválida!<br>Por favor, digite apenas 'pedra', 'papel' ou 'tesoura'.";
        document.getElementById("resultado").classList.remove("oculto");        
        return;
    }

    let escolhaJogadorNumero;

    if(escolhaJogador === "pedra") {
        escolhaJogadorNumero = 0;
    }
    else if(escolhaJogador === "papel") {
        escolhaJogadorNumero = 1;
    }
    else if(escolhaJogador === "tesoura") {
        escolhaJogadorNumero = 2;
    }

    const numeroAleatorio = Math.floor(Math.random() * 3);

    let escolhaComputador = "";

    if(numeroAleatorio === 0) {
        escolhaComputador = "pedra";
    }
    else if(numeroAleatorio === 1) {
        escolhaComputador = "papel";
    }
    else {
        escolhaComputador = "tesoura";
    }

    let resultado = "";

    if(escolhaJogadorNumero === numeroAleatorio) {
        resultado = "Empate!";
    } else {
        if(escolhaJogadorNumero === 0) {
            if(numeroAleatorio === 1) {
                resultado = "Derrota! (Papel embrulha Pedra)";
            } else {
                resultado = "Vitória! (Pedra quebra Tesoura)";
            }
        }
        else if(escolhaJogadorNumero === 1) {
            if(numeroAleatorio === 0){
                resultado = "Vitória! (Papel embrulha Pedra)";
            } else {
                resultado = "Derrota! (Tesoura corta Papel)";
            }
        }
        else if(escolhaJogadorNumero === 2) {
            if(numeroAleatorio === 0) {
                resultado = "Derrota! (Pedra quebra Tesoura)";
            } else {
                resultado = "Vitória! (Tesoura corta Papel)";
            }
        }
    }

    document.getElementById("painel").classList.add("oculto");

    const feedback = `Você escolheu: <strong>${escolhaJogador.toUpperCase()}</strong>\n` + 
                     `O computador escolheu: <strong>${escolhaComputador.toUpperCase()}</strong>\n\n` +
                     `Resultado final: <strong>${resultado}</strong>`;

    document.getElementById("textoResultado").innerHTML = feedback;
    document.getElementById("resultado").classList.remove("oculto");
}