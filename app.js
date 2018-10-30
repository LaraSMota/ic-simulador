const boxes = document.querySelectorAll('.box'); // seleciona os quadrados do grid
const comboBox = document.querySelector('#combo-box');

// POG - MAS N MEXA
boxes.forEach((b) => {
  b.style.backgroundColor = 'transparent';
})

let obstaculos = [];
let posicaoRobo;
let destino;
let rota = [];

let btnCima = document.querySelector('#btnCima');
let btnBaixo = document.querySelector('#btnBaixo');
let btnEsquerda = document.querySelector('#btnEsquerda');
let btnDireita = document.querySelector('#btnDireita');
let btnStart = document.querySelector('#btnStart');
let btnConfigurar = document.querySelector('#btnConfigurar');
let btnReset = document.querySelector('#btnReset');

btnCima.addEventListener('click', moverCima);
btnBaixo.addEventListener('click', moverBaixo);
btnEsquerda.addEventListener('click', moverEsquerda);
btnDireita.addEventListener('click', moverDireita);
btnStart.addEventListener('click', start);
btnConfigurar.addEventListener('click', configurar);
btnReset.addEventListener('click', resetar);

document.getElementById("btnReset").style.display="none";
document.getElementById("movimentaRobo").style.display = "none";
movimentaTeclado();

//Evento para movimentar robo pelo teclado
function movimentaTeclado() {
  document.addEventListener('keydown', function (event) {
    if(document.getElementById("movimentaRobo").style.display !== "none"){
      if (event.keyCode === 38){
      moverCima();
      return;
      }
      if (event.keyCode === 40){
      moverBaixo();
      return;
      }
      if (event.keyCode === 39){
      moverDireita();
      return;
      }
      if (event.keyCode === 37){
      moverEsquerda();
      return;
      }
    } else {
      return;
    }
  });
}

// posicao do robo e destino anterior
let posicaoRoboAnterior = null;
let destinoAnterior = null;

window.onload = populaArray;

let salaPopulada;
let cor;

// preenche matriz
function populaArray() {
  salaPopulada = geraArray(); // cria matriz
  for(let i = 0; i < salaPopulada.length; i++) {
    for(let j = 0; j < salaPopulada[i].length; j++) {
      salaPopulada[i][j] = '0';
    }
  }
}

// cria matriz vazia
function geraArray() {
  let sala = new Array(8);
  for(let i = 0; i < sala.length; i++) {
    sala[i] = new Array(14);
  }
  return sala;
}


// let obstaculos = []; // guarda posicao dos obstaculos

// para cada quadrado adiciona um evento de click que modifica a cor do mesmo
function gridClick() {
  boxes.forEach(box => {
    box.addEventListener('click', pintaSala);
  })
} 

// pinta quadrado clicado com a cor correspondente com a opcao selecionada
function pintaSala(evt) {
  if(comboBox.selectedIndex !== 0){
    if(evt.target.style.backgroundColor !== cor && evt.target.style.backgroundColor !== 'transparent' //significa que ele quer sobrescrever. Não permitimos essa ação.
    || document.getElementById("movimentaRobo").style.display !== "none") { //significa que está na aba de start, onde edições não são permitidas
        
    } else { 
    if(evt.target.style.backgroundColor !== cor) {
      evt.target.style.backgroundColor = cor;
    } else {
      evt.target.style.backgroundColor = 'transparent';
    } 

    let i = evt.target.dataset.i;   // pega os valores de i setados no html
    let j = evt.target.dataset.j;   // pega os valores de j setados no html
    //salaPopulada[i][j] = '1';
    // posicao = [i,j] 
    salvaDado(i,j);
    }
  }
}


// n esta sendo utilizado
function removeClick() {
  console.log('remove')
  boxes.forEach(box => {
    box.removeEventListener('click');
  })
}

// salva dados em suas variaveis correspondentes
function salvaDado(i, j) {
  switch(comboBox.selectedIndex) {
    case 1: 
      obstaculos = verificaArray(i, j);
    break;

    case 2: 
      verificaPosicaoAnterior(posicaoRoboAnterior);
      posicaoRobo = [i, j];
      posicaoRoboAnterior = posicaoRobo; // guarda a posicao anterior do robo
      rota = [];
      rota.push(posicaoRobo);
    break;

    case 3: 
      verificaPosicaoAnterior(destinoAnterior);
      destino = [i, j];
      destinoAnterior = destino;
    break;
  }
}

/* se o robo tiver uma posicao anterior ela deve ser desmarcada */
function verificaPosicaoAnterior(posicaoAnterior) {
  if(posicaoAnterior) {
    removeMarcacaoAnterior(posicaoAnterior);
  }
}

// remove ou adiciona elemento no array de obstaculos
function verificaArray(posI,posJ) {
  for(let k = 0; k < obstaculos.length; k++) {
    if(JSON.stringify(obstaculos[k]) === JSON.stringify([posI,posJ])) {
      obstaculos.splice(k, 1);
      marcaSala(posI, posJ, '0'); /* COD ANTERIOR salaPopulada[posI][posJ] = '0'; */
      return obstaculos;
    } 
  }
  marcaSala(posI, posJ, '1'); /* COD ANTERIOR salaPopulada[posI][posJ] = '1'; */
  obstaculos.push([posI,posJ]);
  return obstaculos;
}

// marca posicao selecionada no array da sala
function marcaSala(i, j, valor) {
  salaPopulada[i][j] = valor;
}

// deseleciona posicao selecionada anteriormente
function removeMarcacaoAnterior(posicaoAnterior) {
  console.log(posicaoAnterior)
  document.querySelector(`[data-i="${posicaoAnterior[0]}"][data-j="${posicaoAnterior[1]}"]`).style.backgroundColor = 'transparent';
}

// function verificaArray(obstaculos, i, j) {
//   console.log(obstaculos)
//   if(obstaculos.indexOf([i, j]) === -1) {
//     obstaculos.push([i,j]) 
//   } else {
//     console.log('ENCONTROU')    
//   }
//   console.log(obstaculos)
// }

/*********************
  - CRIAR FUNCAO PARA ADICIONAR EVENTLISTENER
  - CRIAR FUNCAO PARA REMOVER EVENTLISTENER
**********************/

comboBox.addEventListener('change', opcaoSelecionada);

function opcaoSelecionada() {
  const item = comboBox.selectedIndex;
  selecionaFuncao(item);
}

// O PROBLEMA DEVE SER AQUI
// function selecionaOpcao() {
//   // const item = comboBox.selectedIndex;
//   // console.log(item);
//   const item = comboBox.selectedIndex;
//   console.log(item);
//   selecionaFuncao(item);
//   // if(item != 0) {
//   //   gridClick();
//   // } else {
//   //   removeClick();
//   // }
//   return item;
// }

// executa funcao correspondente com a opcao selecionada
function selecionaFuncao(opcao) {
  switch(opcao) {
    case 1: 
      setarObstaculos();
    break;

    case 2: 
      posicionarRobo();
    break;

    case 3: 
      definirDestino();
    break;

    case 4: 
      resolverProblema();
    break;

    case 5: 
      visualizarSolucao();
    break;
  }
}

function setarObstaculos() {
  /* let obstaculos; */
  cor = 'black';
  gridClick();
}

function posicionarRobo() {
  // console.log('posicionarRobo')
  cor = 'lightblue';
  gridClick();
}

function definirDestino() { 
  // console.log('definirDestino')
  cor = 'green';
  gridClick();
}

function resolverProblema() {
  // console.log('resolverProblema')
}

function visualizarSolucao() {
  // console.log('visualizarSolucao')
  cor = 'yellow';
  gridClick();
}

function selecionaCor() {

  switch(opcao) {
    case 1: 
      return 'red';

    case 2: 
      return 'gray';

    case 3: 
      return 'green';

    case 4: 
      return 'blue';

    case 5: 
      return 'yellow';
  }
}
function moverCima(){
  if(posicaoRobo[0] > 0){
    let proxPosicao = new Array(2);
    proxPosicao[0] = posicaoRobo[0] - 1;
    proxPosicao[1] = posicaoRobo[1];

    if(verificaObstaculo(proxPosicao)){
      executaMovimento(proxPosicao)
    }
  }
}

function moverBaixo() {
  if(posicaoRobo[0] < 7){
    let proxPosicao = new Array(2);
    proxPosicao[0] = Number(posicaoRobo[0]) + 1;
    proxPosicao[1] = posicaoRobo[1];
    
    if(verificaObstaculo(proxPosicao)) {
      executaMovimento(proxPosicao)
    }
  }
}

function moverEsquerda() {
  if(posicaoRobo[1] > 0){
    let proxPosicao = new Array(2);
    proxPosicao[0] = posicaoRobo [0];
    proxPosicao[1] = posicaoRobo [1] - 1;

    if(verificaObstaculo(proxPosicao)) {
      executaMovimento(proxPosicao)
    }
  }
}

function moverDireita() {
  if(posicaoRobo[1] < 13){
    let proxPosicao = new Array(2);
    proxPosicao[0] = posicaoRobo[0];
    console.log('0:', proxPosicao[0]);
    proxPosicao[1] = Number(posicaoRobo[1]) + 1;

    if(verificaObstaculo(proxPosicao)) {
      executaMovimento(proxPosicao);
    }
  }
}

function executaMovimento(proxPosicao){
  document.querySelector(`[data-i="${posicaoRobo[0]}"][data-j="${posicaoRobo[1]}"]`).style.backgroundColor = 'transparent';
  posicaoRobo = proxPosicao;
  posicaoRoboAnterior = posicaoRobo;
  rota.push(posicaoRobo);
  document.querySelector(`[data-i="${posicaoRobo[0]}"][data-j="${posicaoRobo[1]}"]`).style.backgroundColor = 'lightblue';

  if(String(posicaoRobo) === String(destino)){
    alert ("Parabéns! Você chegou ao seu destino\nVocê andaou " + rota.length + " posições");
    document.getElementById("movimentaRobo").style.display="none";
    document.getElementById("combo-box").style.display="none";
    document.getElementById("configura-start").style.display="none";
    document.getElementById("btnReset").style.display="block";
  }
}

function verificaObstaculo(prox) {
  for(let k = 0; k < obstaculos.length; k++){
    if(String(obstaculos[k]) === String(prox)){
       return 0;
    }
  }
  return 1;
}

function start(){
  if(posicaoRobo === undefined || destino === undefined){
    alert ("É necessário que exista um Robô e um Destino");
  } else {
    document.getElementById("movimentaRobo").style.display="block";
    document.getElementById("combo-box").style.display="none";
  }
}

function configurar(){
  document.getElementById("movimentaRobo").style.display="none";
  document.getElementById("combo-box").style.display="block";
}

function resetar(){
  location.reload();
}
/* ********************************* CONFIGURACAO ANTIGA DA SALA ******************************* */

// Configuracao da sala
// const btnConfig = [].slice.call(document.querySelectorAll('.btn-config-sala')); // converte nodelist em array
// const divSetaConfig = document.querySelector('.salva-config');
// btnConfig.forEach((btn) => {
//   btn.addEventListener('click', (evt) => {
//     desabilitaBtn(evt.target.innerHTML);
//     divSetaConfig.style.display = 'block'; 
//   })
// })

// desabilita btn
// function desabilitaBtn(btn) {
//   btnConfig.forEach((b) => {
//     b.innerHTML !== btn ? b.disabled = true : null;
//   }) 
// }

// const btnCancelar = document.querySelector('#btn-cancelar');
// const btnSalvar = document.querySelector('#btn-salvar');
// btnCancelar.addEventListener('click', cancelaConfig);
// btnSalvar.addEventListener('click', salvaConfig);

// // cancela configuracao
// function cancelaConfig() {
//   habilitaBtn();
//   removeDiv();
// }

// // salva configuracao
// function salvaConfig() {
//   habilitaBtn();
//   removeDiv();
// }

// // habilita btn
// function habilitaBtn() {
//   btnConfig.forEach((b) => {
//     b.disabled = false;
//   })
// }

// function removeDiv() {
//   divSetaConfig.style.display = 'none'; 
// }