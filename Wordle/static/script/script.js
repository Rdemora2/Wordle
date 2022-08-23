// Cria uma constante incluindo todo o body
const body = document.querySelector("body");

// Captura tudo que esta ocorrrendo no body, e EXECUTA FUNÇÃO PRINCIPAL
body.addEventListener("keydown", main);

// Recebe as entradas do teclado, por meio da function principal
let attempt = [];

// variavel para troca de linha
let rowActual = 0;

// palavra do dia
let dayword = "BUSER";

// contador para for da função valida
let counter = 0;

// guarda o número de vezes que o usuário digitou
let numberOfLetters = 0;

// Seleciona a caixa para que possamos preenche-la
function getSquare(row, column) {
    // cria uma variável pra, por meio do indice, termos o id que precisamos
    let elementName = `r${row}c${column}`;
    // pega o id criado no passo anterior e seleciona no html
    const element = document.querySelector(`#${elementName}`);
    // retorna a div do quadrado para o fillSquare
    return element;
}

// recebe os valores da lista attempt e executa a função
function fillSquare(arr){
    // torna o indice atual, zero
    let columnActual = arr.length - 1;
    // cria uma variável que executa  a função e armazena o valor retornado
    let square = getSquare(rowActual, columnActual);
    // cria um text content nas divs
    square.textContent = arr[columnActual];
}

// apaga o conteudo da caixa
function emptyBox(row, column){
    // executa a função getSquare
    let square = getSquare(row, column);
    // esvazia a caixa, entregando uma string vazia
    square.textContent = '';
}

// seleciona as caixas e pinta da cor 
function paintSquare(column, classe) {
    //cria uma variável que executa a função getSquare
    let square = getSquare(rowActual, column)
    // atribui a classe de cor verde a caixa
    square.classList.add(classe);
}

// validação de acerto
function validation(){
    let classe = "";
    // valida letra por letra recebida, da coluna 0 até o final do comprimento da attempt
    for (i=0; i<attempt.length; i++){
        // valida se a palavra inserida pelo usuário está correta
        if (attempt[i] == dayword[i]){
            // atribui a classe para pintar verde
            classe = 'fullcorrect'
            // executa a paintSquare de acordo com o indice
            paintSquare(i, classe)
            // insere um contador de letras para usar no proximo if
            counter++
        // valida se a palavra inserida pelo usuário está correta, mas na posição errada
        } else if (dayword.includes(attempt[i])){
            // atribui a caixa para pintar amarelo
            classe = "correct";
            // executa a paintSquare de acordo com o indice
            paintSquare(i, classe);
        // valida se a palavra inserida pelo usuário está incorreta
        } else {
            // atribui a classe para pintar cinza
            classe = "incorrect";
            // executa a paintSquare de acordo com o indice
            paintSquare(i, classe);
        }
    }
    if (counter == 5) {
        // caso a validação anterior de certo, emite um alert informando o usuário do acerto
        window.alert('boa cachorro, sucesso');
    } else{
        // pula de linha
        rowActual++
        // zera a lista
        attempt = []
        // zera para funcionar o backspace
        numberOfLetters = 0;
        // zera o contador para solucionar bug da validação
        counter = 0;
    }
}

// recebe e filtra caracteres, evitando a inclusão de caracteres especiais
function receiveLetters(letter){
    // criar uma constante com o alfabeto
    const alphabet = [
    'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q',
    'R','S','T','U','V','W','X','Y','Z'];
    // inclui o valor no array e impede que o usuário insira caracteres especiais no grid, limitando apenas ao alfabeto da constante acima
    if(alphabet.includes(letter)){
        // preenche a lista - dá um push do listener para a attempt, e solicita apenas a key do event(que é onde contém a letra pressionada)
        attempt.push(letter);
        // pula para a proxima caixa
        numberOfLetters++;
      // apaga o último valor do array
    } else if(letter == 'BACKSPACE'){
        // atribui para a tecla backspace a função de excluir o último valor do array
        attempt.pop();
        // volta para a caixa alterior
        numberOfLetters--;
        // executa a função que esvazia a ultima caixa digitada
        emptyBox(rowActual, numberOfLetters);
    }
}

// Puxa as teclas do listener
function main(event){
    // executa a função de recebimento e filtragem de letras
    receiveLetters(event.key.toUpperCase());
    // 6 Executa a função fillSquare e envia nossa lista attempt
    fillSquare(attempt);
    // valida se tem 5 letras na linha
    if(attempt.length==5){
        // caso passe na validação, chama a função de validação de texto
        validation();
    }
} 