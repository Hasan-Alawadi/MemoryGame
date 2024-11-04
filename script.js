const characters = ['🦸', '🦹', '👾', '🤖', '👽', '🐲', '🧛', '🧟'];
const cards = [...characters, ...characters]; // Duplicate each character to create pairs
let firstCard = null;
let secondCard = null;
let lockBoard = false;

// Shuffle cards the random Number 
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Create card elements when i click will be flipcard 
function createBoard() {
    const gameBoard = document.getElementById('game-board');
    shuffle(cards).forEach((character, index) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.character = character;
        card.innerHTML = '?';
        card.addEventListener('click', flipCard);
        gameBoard.appendChild(card);
    });
}

// Flip card
function flipCard() {
    if (lockBoard || this === firstCard) return;

    this.classList.add('flipped');
    this.innerHTML = this.dataset.character;

    if (!firstCard) {
        firstCard = this;
    } else {
        secondCard = this;
        lockBoard = true;
        checkMatch();
    }
}

// Check if cards match
function checkMatch() {
    if (firstCard.dataset.character === secondCard.dataset.character) {
        disableCards();
    } else {
        unflipCards();
    }
}

// Disable matched cards
function disableCards() {
    setTimeout(() => {
        firstCard.classList.add('hidden');
        secondCard.classList.add('hidden');
        resetBoard();
    }, 1000);
}

// Unflip non-matching cards
function unflipCards() {
    setTimeout(() => {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        firstCard.innerHTML = '?';
        secondCard.innerHTML = '?';
        resetBoard();
    }, 1000);
}

// Reset board state
function resetBoard() {
    [firstCard, secondCard] = [null, null];
    lockBoard = false;
}

// Initialize game
createBoard();

