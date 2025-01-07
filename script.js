const cards = document.querySelectorAll('.card');
let hasFlippedCard = false;
let firstCard, secondCard;
let lockBoard = false;
let matchesFound = 0;
const totalPairs = 8;
const confettiContainer = document.getElementById('confetti-container');
const playAgainBtn = document.getElementById('play-again');

// Flip card logic
function flipCard() {
    if (lockBoard || this === firstCard) return;

    this.classList.add('flipped');

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
    } else {
        secondCard = this;
        checkForMatch();
    }
}

// Check if two cards match
function checkForMatch() {
    const isMatch = firstCard.dataset.image === secondCard.dataset.image;
    isMatch ? disableCards() : unflipCards();
}

// Show confetti animation
function startConfetti() {
    for (let i = 0; i < 300; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        confetti.style.left = `${Math.random() * 100}vw`;
        confetti.style.animationDelay = `${Math.random() * 2}s`;
        confetti.style.backgroundColor = ['#FFC107', '#2196F3', '#FF5722', '#4CAF50', '#E91E63'][Math.floor(Math.random() * 5)];
        confettiContainer.appendChild(confetti);
        confetti.addEventListener('animationend', () => confetti.remove());
    }
}

// Show confetti and play again button on win
function showConfetti() {
    startConfetti();
    playAgainBtn.style.display = 'block';
    document.getElementById('congratulations').style.display = 'block';
}

// Disable matched cards
function disableCards() {
    firstCard.classList.add('matched');
    secondCard.classList.add('matched');
    matchesFound++;

    if (matchesFound === totalPairs) showConfetti();
    resetBoard();
}

// Unflip cards if not matched
function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        resetBoard();
    }, 1000);
}

// Reset board state
function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

// Shuffle the cards
(function shuffle() {
    cards.forEach(card => {
        card.style.order = Math.floor(Math.random() * 16);
    });
})();

// Add event listeners
cards.forEach(card => card.addEventListener('click', flipCard));
playAgainBtn.addEventListener('click', () => window.location.reload());
