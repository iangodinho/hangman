"use strict";
const listaPalavras = ['CACHORRO', 'GATO', 'COELHO', 'ONÇA', 'GALINHA', 'MACACO', 'RINOCERONTE', 'ELEFANTE', 'ORNITORRINCO', 'PIZZA', 'HAMBURGUER', 'ESTROGONOFE', 'JABUTICABA', 'MELANCIA', 'REFRIGERANTE', 'LEITE'];
let palavraEscolhida;
let exibicaoPalavra;
let letrasChutadas;
let tentativasRestantes;
let numeroErros;
function inicializaVariaveis() {
    letrasChutadas = [];
    tentativasRestantes = 7;
    numeroErros = 0;
}
function escondeBotaoReiniciar() {
    const botaoReiniciar = document.getElementById('btn-reiniciar');
    if (botaoReiniciar) {
        botaoReiniciar.style.display = 'none';
    }
}
function habilitaInputChuteUmaLetra() {
    const entradaLetra = document.getElementById('entrada-letra');
    if (entradaLetra) {
        entradaLetra.disabled = false;
    }
}
function habilitaBotaoChutar() {
    const botaoChutar = document.getElementById('btn-chutar');
    if (botaoChutar) {
        botaoChutar.disabled = false;
    }
}
function sorteiaPalavraSecreta() {
    palavraEscolhida = listaPalavras[Math.floor(Math.random() * listaPalavras.length)];
}
function codificaPalavraSecreta() {
    exibicaoPalavra = Array(palavraEscolhida.length).fill('_');
}
function iniciarJogo() {
    escondeBotaoReiniciar();
    habilitaInputChuteUmaLetra();
    habilitaBotaoChutar();
    sorteiaPalavraSecreta();
    codificaPalavraSecreta();
    inicializaVariaveis();
    atualizarExibicao();
    const entradaLetra = document.getElementById('entrada-letra');
    if (entradaLetra) {
        entradaLetra.focus();
    }
}
function verificaSeJogoTerminou() {
    if (tentativasRestantes === 0) {
        encerrarJogo('Você perdeu!');
    }
    else if (!exibicaoPalavra.includes('_')) {
        encerrarJogo('Parabéns, você venceu!');
    }
}
function atualizaImagem() {
    const imagem = document.getElementById('imagem');
    if (imagem) {
        imagem.src = `../imagens/forca${numeroErros}.png`;
    }
}
function ajustaPalavraSecreta() {
    const exibicaoPalavraElemento = document.getElementById('exibicao-palavra');
    if (exibicaoPalavraElemento) {
        exibicaoPalavraElemento.innerText = exibicaoPalavra.join(' ');
    }
}
function ajustaLetrasUsadas() {
    const letrasChutadasElemento = document.getElementById('letras-chutadas');
    if (letrasChutadasElemento) {
        letrasChutadasElemento.innerText = letrasChutadas.join(', ');
    }
}
function resetaMensagemJogo() {
    const mensagemElemento = document.getElementById('mensagem');
    if (mensagemElemento) {
        mensagemElemento.innerText = '';
    }
}
function atualizarExibicao() {
    ajustaPalavraSecreta();
    ajustaLetrasUsadas();
    resetaMensagemJogo();
    atualizaImagem();
    verificaSeJogoTerminou();
}
function atualizaErroDoJogador() {
    tentativasRestantes--;
    numeroErros++;
}
function obterLetraDoInput() {
    const entradaLetra = document.getElementById('entrada-letra');
    return entradaLetra.value.toUpperCase();
}
function registraLetraChutada(letra) {
    letrasChutadas.push(letra);
}
function atualizaPalavraExibida(letra) {
    for (let i = 0; i < palavraEscolhida.length; i++) {
        if (palavraEscolhida[i] === letra) {
            exibicaoPalavra[i] = letra;
        }
    }
}
function letraValida(letra) {
    return /^[a-zà-ùç]$/i.test(letra);
}
function letraJaChutada(letra) {
    return letrasChutadas.includes(letra);
}
function letraCorreta(letra) {
    return palavraEscolhida.includes(letra);
}
function limparEntrada() {
    const entradaLetra = document.getElementById('entrada-letra');
    if (entradaLetra) {
        entradaLetra.value = '';
    }
    atualizarExibicao();
    if (entradaLetra) {
        entradaLetra.focus();
    }
}
function chutarLetra() {
    const letra = obterLetraDoInput();
    if (!letraValida(letra)) {
        alert('Por favor, insira uma letra válida!');
        return;
    }
    if (letraJaChutada(letra)) {
        alert('Você já tentou essa letra. Tente novamente!');
        return;
    }
    registraLetraChutada(letra);
    if (letraCorreta(letra)) {
        atualizaPalavraExibida(letra);
    }
    else {
        atualizaErroDoJogador();
    }
    limparEntrada();
}
function exibeBotaoReiniciar() {
    const botaoReiniciar = document.getElementById('btn-reiniciar');
    if (botaoReiniciar) {
        botaoReiniciar.style.display = 'block';
    }
}
function desabilitaCampoDigitacao() {
    const entradaLetra = document.getElementById('entrada-letra');
    if (entradaLetra) {
        entradaLetra.disabled = true;
    }
}
function desabilitaBotaoChutar() {
    const botaoChutar = document.getElementById('btn-chutar');
    if (botaoChutar) {
        botaoChutar.disabled = true;
    }
}
function exibeMensagemFimDeJogo(mensagem) {
    const mensagemElemento = document.getElementById('mensagem');
    if (mensagemElemento) {
        mensagemElemento.style.display = 'block';
        mensagemElemento.innerText = mensagem;
    }
}
function encerrarJogo(mensagem) {
    desabilitaCampoDigitacao();
    desabilitaBotaoChutar();
    exibeMensagemFimDeJogo(mensagem);
    exibeBotaoReiniciar();
}
window.onload = iniciarJogo;
