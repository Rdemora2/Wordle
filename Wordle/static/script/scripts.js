// Constante só não ficar repetindo no código kk
const getEl = (selector) => {
  return document.querySelector(selector);
} 

// Constante só não ficar repetindo no código kk
const getEls = (selector) => {
  return document.querySelectorAll(selector);
} 

// Cria uma variável contento todos os quadrados do grid
let squares = ['.row1 .square', '.row2 .square', '.row3 .square', '.row4 .square', '.row5 .square', '.row6 .square'];

// Define a palavra
let wordOfDay = 'BUSER';

// Pega as letras digitadas pelo tecl fisico e faz as acoes no tabuleiro
const getKey = (eventK) => {
  if (! squares) return "O Jogo Já Terminou";
  // Converte para maiúsculo
  let char = eventK.key.toUpperCase();
  // Cria variável de alfabeto para evitar inserção de number
  let alphabet = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
  
  if (alphabet.includes(char)){
      insertInTab(squares[0], char);
      return null;
  }
  
  let lastValue = getEls(squares[0])[4].textContent

  if (char == 'ENTER' && lastValue != ''){
      verifyWord(squares[0], wordOfDay);
      winOrNot(squares[0]);
      squares.shift();
      return null;
  }
  if (char == 'DEL'){
      let els = getEls(squares[0]);
      let i = els.length - 1;
      for (; i >= 0; i--){
          if (els[i].textContent != ''){
              els[i].textContent = '';
              els[i].classList.remove('insert-char-on')
              break;
          }
      }
  }
}


// verifica se o usuário ganhou ou não, dada a linha digitada:
const winOrNot = (selector) => {
  let truthTable = (ac, elAt) => {
      v  = elAt.classList.contains('fullcorrect')? 1 : 0; 
      return ac * v;
  }

  let arr = getEls(selector);
  if ([... arr].reduce(truthTable, 1)) {
      alert("Ganhou!!!!!");

      document.body.removeEventListener('keypress', getKey);
      for(let el of getEls('.key')){
          el.onclick = '';
      }
  }

}


// pega as letras do teclado virtual e insere no tabuleiro
const getVirtualKey = (obj) => {
  if (obj.classList.contains('key_del')) getKey({key: 'DEL'});

  let char = obj.textContent;
  let sinteticEventK = { key: char };
  getKey(sinteticEventK);
}




// inseri a letra no primeiro espaço existente na linha
const insertInTab = (selector, char) => {
  for (let el of getEls(selector)){
      if (el.textContent == ''){
          el.textContent = char;
          el.classList.add('insert-char-on');
          return el;
      }  
  }
}


// Verifica se as letras da palavra inserida estão no local correto e se existem na palavra do dia
const verifyWord = (selector, wordOfDay) => {
  let elements = getEls(selector);
  let i = 0;
  for (let el of elements){
      if (wordOfDay[i] == el.textContent){
          el.classList.add('fullcorrect');
             buttonNewClass(el.textContent,'fullcorrect');
      }
      else if(wordOfDay.includes(el.textContent)){
          el.classList.add('correct');
          buttonNewClass(el.textContent,'correct');
      }
      else {
          el.classList.add('incorrect');
          buttonNewClass(el.textContent,'incorrect');
      }
      i++;
  }
}


// responsavel por adicionar à classe *correct também ao botão
const buttonNewClass = (char, newClass) => {
  for(let el of getEls('.key')){
      if (el.textContent == char){
          if (! el.classList.contains(newClass)){
              el.classList.add(newClass);
          }
      }
  }
}

const getKeyDel = (event_) => {
  if (event_.key === 'Backspace'){
      getKey({key: 'DEL'});
  }
}


// adiciona o keypress ao body 
document.body.addEventListener('keypress', getKey);
document.body.addEventListener('keydown', getKeyDel)