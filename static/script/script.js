// 1 Criamos uma constante incluindo todo o body
const body = document.querySelector("body");

// 2 Captura tudo que esta ocorrrendo no body, e EXECUTA FUNÇÃO PRINCIPAL
body.addEventListener("keydown", principal);

// 3 Recebe as entradas do teclado, por meio da function principal
let tentativa = [];

//variavel para troca de linha
let rowActual = 0;

// palavra do dia
let dayword = "BUSER";

// contador para for da função valida
let counter = 0;

// guarda o número de vezes que o usuário digitou
let numeroLetrasDigitadas = 0;

// 10 Seleciona a caixa para que possamos preenche-la
function pegaCaixa(row, column) {
    // 11 cria uma variável pra, por meio do indice, termos o id que precisamos
    let elementoNome = `r${row}c${column}`;
    console.log(elementoNome);
    // 12 pega o id criado no passo anterior e seleciona no html
    const elemento = document.querySelector(`#${elementoNome}`);
    // 13 retorna a div do quadrado para o preencheCaixa
    return elemento;
}

// 7 recebe os valores da lista tentativa e executa a função
function preencheCaixa(arr){
    // 8 torna o indice atual, zero
    let columnActual = arr.length - 1;
    // 9 cria uma variável que executa  a função e armazena o valor retornado
    let caixa = pegaCaixa(rowActual, columnActual);
    // 14 cria um text content nas divs
    caixa.textContent = arr[columnActual];
}

// apaga o conteudo da caixa
function esvaziaCaixa(linha, coluna){
    // 
    let caixa = pegaCaixa(linha, coluna);
    // esvazia a caixa, entregando uma string vazia
    caixa.textContent = '';
}

// validação de acerto
function valida(){
    // valida letra por letra recebida, da coluna 0 até o final do comprimento da tentativa
    for (i=0; i<tentativa.length; i++){
        // valida se a palavra inserida pelo usuário está correta
        if (tentativa[i] == dayword[i]){
            // insere um contador de letras para usar no proximo if
            counter++
        }
    }
    if (counter == 5) {
        // caso a validação anterior de certo, emite um alert informando o usuário do acerto
        window.alert('boa cachorro, sucesso');
    } else{
        // pula de linha
        rowActual++
        // zera a lista
        tentativa = []
        // zera para funcionar o backspace
        numeroLetrasDigitadas = 0;
    }
}

function recebeLetras(letra){
    // criar uma constante com o alfabeto
    const alphabet = [
    'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q',
    'R','S','T','U','V','W','X','Y','Z'];
    // impede que o usuário insira caracteres especiais no grid
    if(alphabet.includes(letra)){
        // 5 preenche a lista - dá um push do listener para a tentativa, e solicita apenas a key do event(que é onde contém a letra pressionada)
        tentativa.push(letra);
        numeroLetrasDigitadas++;
        console.log(tentativa);
      // apaga o último valor do array
    } else if(letra == 'BACKSPACE'){
        // atribui para a tecla backspace a função de excluir o último valor do array
        tentativa.pop();
        console.log(tentativa);
        // volta para a caixa alterior
        numeroLetrasDigitadas--;
        // executa a função que esvazia a ultima caixa digitada
        esvaziaCaixa(rowActual, numeroLetrasDigitadas);
    }
}

// 4 Puxa as teclas do listener
function principal(event){
    // executa a função de recebimento e filtragem de letras
    recebeLetras(event.key.toUpperCase());
    // 6 Executa a função preencheCaixa e envia nossa lista tentativa
    preencheCaixa(tentativa);
    // valida se tem 5 letras na linha
    if(tentativa.length==5){
        // caso passe na validação, chama a função de validação de texto
        valida();
    }
} 