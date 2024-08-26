const listaPalavras: string[] = ['CACHORRO', 'GATO', 'COELHO', 'ONÇA', 'GALINHA', 'MACACO', 'RINOCERONTE', 'ELEFANTE', 'ORNITORRINCO', 'PIZZA', 'HAMBURGUER', 'ESTROGONOFE', 'JABUTICABA', 'MELANCIA', 'REFRIGERANTE', 'LEITE'];
  
  let palavraEscolhida: string;
  let exibicaoPalavra: string[];
  let letrasChutadas: string[];
  let tentativasRestantes: number;
  let numeroErros: number;
  
  function inicializaVariaveis(): void {
      letrasChutadas = [];
      tentativasRestantes = 7;
      numeroErros = 0;
  }
  
  function escondeBotaoReiniciar(): void {
      const botaoReiniciar = document.getElementById('btn-reiniciar');
      if (botaoReiniciar) {
          botaoReiniciar.style.display = 'none';
      }
  }
  
  function habilitaInputChuteUmaLetra(): void {
      const entradaLetra = document.getElementById('entrada-letra') as HTMLInputElement;
      if (entradaLetra) {
          entradaLetra.disabled = false;
      }
  }
  
  function habilitaBotaoChutar(): void {
      const botaoChutar = document.getElementById('btn-chutar') as HTMLButtonElement;
      if (botaoChutar) {
          botaoChutar.disabled = false;
      }
  }
  
  function sorteiaPalavraSecreta(): void {
      palavraEscolhida = listaPalavras[Math.floor(Math.random() * listaPalavras.length)];
  }
  
  function codificaPalavraSecreta(): void {
      exibicaoPalavra = Array(palavraEscolhida.length).fill('_');
  }
  
  function iniciarJogo(): void {
      escondeBotaoReiniciar();
      habilitaInputChuteUmaLetra();
      habilitaBotaoChutar();
      sorteiaPalavraSecreta();
      codificaPalavraSecreta();
      inicializaVariaveis();
      atualizarExibicao();
      const entradaLetra = document.getElementById('entrada-letra') as HTMLInputElement;
      if (entradaLetra) {
          entradaLetra.focus();
      }
  }
  
  function verificaSeJogoTerminou(): void {
      if (tentativasRestantes === 0) {
          encerrarJogo('Você perdeu!');
      } else if (!exibicaoPalavra.includes('_')) {
          encerrarJogo('Parabéns, você venceu!');
      } 
  }
  
  function atualizaImagem(): void {
      const imagem = document.getElementById('imagem') as HTMLImageElement;
      if (imagem) {
          imagem.src = `../imagens/forca${numeroErros}.png`;
      }
  }
  
  function ajustaPalavraSecreta(): void {
      const exibicaoPalavraElemento = document.getElementById('exibicao-palavra');
      if (exibicaoPalavraElemento) {
          exibicaoPalavraElemento.innerText = exibicaoPalavra.join(' ');
      }
  }
  
  function ajustaLetrasUsadas(): void {
      const letrasChutadasElemento = document.getElementById('letras-chutadas');
      if (letrasChutadasElemento) {
          letrasChutadasElemento.innerText = letrasChutadas.join(', ');
      }
  }
  
  function resetaMensagemJogo(): void {
      const mensagemElemento = document.getElementById('mensagem');
      if (mensagemElemento) {
          mensagemElemento.innerText = '';
      }
  }
  
  function atualizarExibicao(): void {
      ajustaPalavraSecreta();
      ajustaLetrasUsadas();
      resetaMensagemJogo();
      atualizaImagem();
      verificaSeJogoTerminou();
  }
  
  function atualizaErroDoJogador(): void {
      tentativasRestantes--;
      numeroErros++;
  }
  
  function obterLetraDoInput(): string {
      const entradaLetra = document.getElementById('entrada-letra') as HTMLInputElement;
      return entradaLetra.value.toUpperCase();
  }
  
  function registraLetraChutada(letra: string): void {
      letrasChutadas.push(letra);
  }
  
  function atualizaPalavraExibida(letra: string): void {
      for (let i = 0; i < palavraEscolhida.length; i++) {
          if (palavraEscolhida[i] === letra) {
              exibicaoPalavra[i] = letra;
          } 
      }
  }
  
  function letraValida(letra: string): boolean {
      return /^[a-zà-ùç]$/i.test(letra);
  }
  
  function letraJaChutada(letra: string): boolean {
      return letrasChutadas.includes(letra);
  }
  
  function letraCorreta(letra: string): boolean {
      return palavraEscolhida.includes(letra);
  }
  
  function limparEntrada(): void {
      const entradaLetra = document.getElementById('entrada-letra') as HTMLInputElement;
      if (entradaLetra) {
          entradaLetra.value = '';
      }
      atualizarExibicao();
      if (entradaLetra) {
          entradaLetra.focus();
      }
  }
  
  function chutarLetra(): void {
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
      } else {
          atualizaErroDoJogador();
      }
  
      limparEntrada();
  }
  
  function exibeBotaoReiniciar(): void {
      const botaoReiniciar = document.getElementById('btn-reiniciar');
      if (botaoReiniciar) {
          botaoReiniciar.style.display = 'block';
      }
  }
  
  function desabilitaCampoDigitacao(): void {
      const entradaLetra = document.getElementById('entrada-letra') as HTMLInputElement;
      if (entradaLetra) {
          entradaLetra.disabled = true;
      }
  }
  
  function desabilitaBotaoChutar(): void {
      const botaoChutar = document.getElementById('btn-chutar') as HTMLButtonElement;
      if (botaoChutar) {
          botaoChutar.disabled = true;
      }
  }
  
  function exibeMensagemFimDeJogo(mensagem: string): void {
      const mensagemElemento = document.getElementById('mensagem');
      if (mensagemElemento) {
          mensagemElemento.style.display = 'block';
          mensagemElemento.innerText = mensagem;
      }
  }
  
  function encerrarJogo(mensagem: string): void {
      desabilitaCampoDigitacao();
      desabilitaBotaoChutar();
      exibeMensagemFimDeJogo(mensagem);
      exibeBotaoReiniciar();
  }
  
  window.onload = iniciarJogo;
  