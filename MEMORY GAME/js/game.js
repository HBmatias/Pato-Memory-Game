const grid = document.querySelector('.grid');
const spanPlayer = document.querySelector('.player');
const timer = document.querySelector('.timer');
const characters = [
    'card01',
    'card02',
    'card03',
    'card04',
    'card05',
    'card06',
    'card07',
    'card08',
    'card09',
    'card10',
];
const createElement = (tag, className) => {
    const element = document.createElement(tag);
    element.className = className;
    return element;
}

let firtCard = '';
let secondCard = '';

const checkEndGame = () => {
    const disabledCards = document.querySelectorAll('.disabled-card');
    if (disabledCards.length == 20) {
        clearInterval(this.loop);
        alert(`Parabens, ${spanPlayer.innerHTML} Muito top!!!!! seu tempo foi: ${timer.innerHTML}`);  
    }
}
const checkCards = () => {
    const firstCharacter = firtCard.getAttribute('data-character');
    const secondCharacter = secondCard.getAttribute('data-character');

    if (firstCharacter == secondCharacter) {
        firtCard.firstChild.classList.add('disabled-card');
        secondCard.firstChild.classList.add('disabled-card');

        firtCard = '';
        secondCard = '';

        checkEndGame();
    }else {
     setTimeout(() => {
        firtCard.classList.remove('reveal-card');
        secondCard.classList.remove('reveal-card');

        firtCard = '';
        secondCard = '';
     }, 500);
    }
}
const revealCard = ({target}) => {
    if(target.parentNode.className.includes('reveal-card')){
        return;
    }
    if (firtCard == '') {
     target.parentNode.classList.add('reveal-card'); 
     firtCard = target.parentNode;
    }else if (secondCard =='') {
     target.parentNode.classList.add('reveal-card');
     secondCard = target.parentNode;
     checkCards();
    }
}

const createCard = (character) => {
    const front = createElement('div', 'face front');
    const back = createElement('div', 'face back');
    const card = createElement('div', 'card');

    front.style.backgroundImage = `url('../IMAGENS/${character}.png')`;

    card.appendChild(front);
    card.appendChild(back);

    card.addEventListener('click', revealCard);

    card.setAttribute('data-character', character);

    return card;
}

const loadGame =() => {
    const duplicateCharacters = [...characters, ...characters];
    const shuffledArray = duplicateCharacters.sort(() => Math.random() - 0.5);

    shuffledArray.forEach((character) =>{
        const card = createCard(character);
        grid.appendChild(card);
    })
}
const startTimer = () =>{
    this.loop = setInterval(() => {
        const currentTime = +timer.innerHTML;
        timer.innerHTML = currentTime + 1;
    }, 1000)
}
window.onload = () => {
    spanPlayer.innerHTML = localStorage.getItem('player');
    startTimer();
    loadGame();
}
