const frontSel = document.querySelectorAll('.front')
const cards = document.querySelectorAll('.card');
const startBtn = document.getElementById('start');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

let selOne;
let selTwo;

let matchedCounter = 0;

let array = [];



function frontVisibility() {
    this.style.visibility = 'hidden';
    if (!hasFlippedCard) {
        selOne = this;
    }

    selTwo = this;
};



function startTimer(){
    let second = 0;
    let minute = 0
    const timer = document.getElementById('timer');
    let interval;
    interval = setInterval(function(){
        timer.innerHTML = minute + ":" + second;
        second++;
        if(second < 10){
            second = '0' + second;
        }

        if(second === 60) {
            minute++;
            second = 0;
        }

        if(minute === 60) {
            hour++;
            minute = 0;
        }
    }, 1000);
};



function shuffle() {
    cards.forEach(card => {
        let randomOrder = Math.floor(Math.random() * 16);
        card.style.order = randomOrder;
    });
};



function startGame() {
    shuffle(cards);
    startTimer();
};



function flipCard() {
    if (this === firstCard) return;

    this.classList.add('flip');

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    secondCard = this;

    checkForMatch();
};



function checkForMatch() {
    if (firstCard.dataset.related === secondCard.dataset.related) {
        disableCards();
        return;
    }

    unflipCards();
};



function disableCards() {
    setTimeout(() => {
        array.push(firstCard)
        array.push(secondCard)

        firstCard.style.visibility = 'hidden'
        secondCard.style.visibility = 'hidden'

        firstCard.removeEventListener('click', flipCard);
        secondCard.removeEventListener('click', flipCard);

        matchedCounter++;
        if (matchedCounter === 8) {
            clearInterval(interval);
            console.log('congrats')
        }

        resetGame();
    }, 1500)
};



function unflipCards() {
    setTimeout(() => {
        selOne.style.visibility = 'visible';
        selTwo.style.visibility = 'visible';

        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetGame();
    }, 1000);
};



function resetGame() {
    hasFlippedCard = false;
    firstCard = null;
    secondCard = null;
}



function endGame() {
    if (matchedCounter === 8) {
        clearInterval(interval);

        // console.log('congrats')
    }
}

function restartButton() {
    
    hasFlippedCard = false;
    firstCard = null;
    secondCard = null;
    matchedCounter = 0;
    seconds = 0;
    minutes = 0;
    selOne = null;
    selTwo = null;
    clearInterval(interval);

    array.forEach(card => card.style.visibility = 'visible')
    cards.forEach(card => card.addEventListener('click', flipCard));
    frontSel.forEach(element => element.style.visibility = 'visible');
    shuffle(cards);
    startTimer();
    
}


cards.forEach(card => card.addEventListener('click', flipCard))
frontSel.forEach(sel => sel.addEventListener('click', frontVisibility))

