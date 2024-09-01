/*para orimizar este codigo iremos substiruir as variaveis em uma so funcao, 
na qual a gnt nao ira precisar colocar tantas linhas de codigos*/

// let titulo = document.querySelector('h1');
// titulo.innerHTML = ('jogo do numero secreto');

// let paragrafo = document.querySelector('p');
// paragrafo.innerHTML = 'Escolha um numero entre 1 e 10';

let listaDeNumerosSorteados =[];
let numeroLimite =  10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

//funcao para exibir textos 
function mostrarTexto(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female' , {rate:1.2} );
}

// fizemos uma funcao para a mensagem para nao ficar repetitivo
function exibirMensagem(){
    mostrarTexto('h1','jogo da nina');
    mostrarTexto('p', 'Escolha um numero entre 1 e 10');

}
exibirMensagem();

//funcao dem parametros
function verificarChute() {
    let chute = document.querySelector('input').value;
    
    if (chute == numeroSecreto){
        mostrarTexto('h1', 'Acertou!');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Parabens! Voce descobriu o numero secreto com ${tentativas} ${palavraTentativa}!`;
        mostrarTexto('p',  mensagemTentativas);
        document.getElementById ('reiniciar') .removeAttribute ('disabled');
    } else{
        if (chute > numeroSecreto){
            mostrarTexto('p', 'O numero secreto e menor seu otario');
        } else{
            mostrarTexto ('p', 'O numero secreto e maior seu babaca');
        }
        tentativas++;
        limparaCampo();
    }
}

//funcao com retorno
function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeDeNumeros = listaDeNumerosSorteados.length;

    if (quantidadeDeNumeros ==  numeroLimite){
        listaDeNumerosSorteados = [];
    }
    if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido);
        console.log(listaDeNumerosSorteados)
        return numeroEscolhido;
    }
}

// funcao para limpar o campo quando o jogador acertar op numero 
function limparaCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}

// funcao para reinicar o jogo 
function reiniciarJogo(){
    numeroSecreto = gerarNumeroAleatorio();
    limparaCampo();
    tentativas = 1
    exibirMensagem();
    document.getElementById('reiniciar').setAttribute ('disabled' , true)
}