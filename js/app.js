let restartBtn = document.querySelector(".restart");

/*
 * Create a list that holds all of your cards
 */

let cards = ['fa-diamond', 'fa-diamond',
    'fa-paper-plane-o', 'fa-paper-plane-o',
    'fa-anchor', 'fa-anchor',
    'fa-bolt', 'fa-bolt',
    'fa-cube', 'fa-cube',
    'fa-leaf', 'fa-leaf',
    'fa-bicycle', 'fa-bicycle',
    'fa-bomb', 'fa-bomb'
];


function generateCard(card) {
    return `<li class="card" data-card="fa ${card}"><i class="fa ${card}"></i></li>`;
};




/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
function initGame() {

    let deck = document.querySelector('.deck');
    const cardHTML = shuffle(cards).map(function (card) {
        return generateCard(card);
    });

    let moves = 0;
    let moveCounter = document.querySelector('.moves');
    moveCounter.innerText = moves;

    deck.innerHTML = cardHTML.join('');
};



generateRating();
buildModal();
initGame();


let allCards = document.querySelectorAll('.card');
let openCards = [];
let matchedCards = [];
let movesCounter = 0;
allCards.forEach(function (card) {
    card.addEventListener("click", function (e) {
        if (!card.classList.contains('open') && !card.classList.contains('show') && !card.classList.contains('match')) {
            openCards.push(card);
            card.classList.add('open', 'show');

            if (openCards.length == 2) {
                if (openCards[0].dataset.card == openCards[1].dataset.card) {
                    openCards[0].classList.add('match', 'open', 'show');
                    openCards[1].classList.add('match', 'open', 'show');

                    matchedCards = matchedCards.concat(openCards);
                    isOver(gameOver);
                    openCards = [];

                };




                setTimeout(function () {
                    openCards.forEach(function (card) {
                        card.classList.remove('open', 'show');
                    });
                    openCards = [];
                }, 1000);
            };
            addMove();
            movesCounter++;
            setRating();

            // Start the timer if it is the first click
            if (moves === 1) {
                timeInt = setInterval(startTimer, 1000);
            };

        };
    });
});


// Add move
let moves = 0;


function addMove() {

    const movesText = document.querySelector('.moves');
    moves++;
    movesText.innerHTML = moves; //innerText


};

// Select the score-panel, add a timer with default value of 00:00, and initialize the total seconds to 0
const timer = document.createElement(`div`);
timer.className = `timer`;
timer.innerHTML = `00:00`;
const scorePanel = document.getElementsByClassName(`score-panel`);
scorePanel[0].appendChild(timer);
let totalSeconds = 0;

// Change the timer values on the webpage to reflect elapsed time in minutes and seconds
function startTimer() {
    ++totalSeconds;
    function addZero(i) {
        return (i < 10) ? `0` + i : i;
    }
    let min = addZero(Math.floor(totalSeconds / 60));
    let sec = addZero(totalSeconds - (min * 60));
    timer.innerHTML = `${min}:${sec}`;
}

// Reset the timer to default of 0 and the text on the webpage to 00:00
function resetTimer() {
    clearInterval(timeInt);
    totalSeconds = 0;
    timer.innerHTML = `00:00`;
}

// Stop the timer
function stopTimer() {
    clearInterval(timeInt);
}

// Rating
function generateRating() {
    // Generate starter number of stars
    for (i = 0; i < 5; i++) {
        const li = document.createElement("LI");
        const starLi = li.innerHTML = `<i class = "fa fa-star"></i>`; // Create a <li> node
        const starsUL = document.getElementsByClassName("stars");
        const starList = starsUL[0];
        const star = starList.appendChild(li);
    };
};



    //Set Rating
function setRating(){

    let star = document.getElementsByClassName("fa fa-star");
         if (movesCounter === 3) {
             star[4].className = "fa fa-star-o"; 
        } else if (moves === 5) {
             star[3].className = "fa fa-star-o";
        } else if (moves === 7) {
             star[2].className = "fa fa-star-o";
        } else if (moves === 9) {
             star[1].className = "fa fa-star-o";
             star[0].className += " redStar";
        };
    };

setRating();

// Check if the game is over and if all 16 cards are matched, stop the timer and display the modal box

let gameOver;

function isOver() {
    gameOver = setTimeout(function () {
        if (matchedCards.length === cards.length) {
            alert("Game OVER");
            stopTimer();
            showGameOverModal();
            buildModal();
            
        };
    }, 500);
};

// Create a div element to add to the page that will hold the congrats message later
// Hide the div element initially
function buildModal () {
    const modalContainer = document.getElementsByClassName('container');
    const modalDiv = document.createElement('div');
    modalDiv.className = `modalBox dimmed`;
    modalDiv.innerHTML = ``;
    modalContainer[0].appendChild(modalDiv);
}

// Display the Modal Box message with the move count, total time, star rating and play again 'button'
function showGameOverModal () {
    const modalDiv = document.getElementsByClassName(`modalBox`);
    scorePanelStars = document.querySelector(".stars").innerHTML;
    modalDiv[0].className = `modalBox`;
    modalDiv[0].innerHTML =
        `<h2>Congratulations!</h2>
        <h3>You've won the game!</h3>
        <p>${movesCounter} moves</p>
        <p>${timer.innerHTML} total time</p>
        <ul class = "stars" >${scorePanelStars}</ul>
        <button class="modalButton"> Play Again</button>`;
    const button = document.getElementsByClassName(`modalButton`);
    button[0].addEventListener(`click`, reset);
    
};

// Hide the congrats popup by adding the class 'dimmed'
// Erase the modal box text messages
function hideModal() {
    const popup = document.getElementsByClassName(`congratsPopup`);
    popup[0].className = `congratsPopup dimmed`;
    popup[0].innerHTML = ``;
}

// Restart Button




function reset(){
    moves = 0;
    movesCounter = 0;
    moveCounter.innerHTML = 0;
    cardHTML = "";

    //call init to crete new cards
    deck.innerHTML = "";

    //generate new deck
    initGame();

    //resest any related variables
    matchedCards = [];
    hideModal();
};

restartBtn.addEventListener("click", reset);