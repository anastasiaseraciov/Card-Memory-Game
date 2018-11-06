let restartBtn = document.querySelector(".restart");
let deck = document.querySelector('.deck');
let openCards = [];
let matchedCards = [];
let timeInt = 0;
let totalSeconds = 0;

// Select the score-panel, add a timer with default value of 00:00, and initialize the total seconds to 0
const timer = document.createElement(`div`);
timer.className = `timer`;
timer.innerHTML = `00:00`;
const scorePanel = document.getElementsByClassName(`score-panel`);
scorePanel[0].appendChild(timer);

// Grab the 'moves' from the HTML and change the text to 0
let moves = document.getElementsByClassName(`moves`);
moves[0].innerHTML = 0;

//Add default value for the the move counter
movesCounter = 0;

// Add eventlistener to listen for click on reset button
restartBtn.addEventListener("click", reset);

// reset();
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

displayCard();

function generateCard(card) {
    return `<li class="card" data-card="fa ${card}"><i class="fa ${card}"></i></li>`;
};

function displayCard() {

    const cardHTML = shuffle(cards).map(function (card) {
        return generateCard(card);
    });

    deck.innerHTML = cardHTML.join('');
};

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

buildModal();
generateStars();
listenCardClick();

function listenCardClick() {
    let allCards = document.querySelectorAll('.card');
    allCards.forEach(function (card) {
        card.addEventListener("click", function (e) {
            if (!card.classList.contains('open') && !card.classList.contains('show') && !card.classList.contains('match')) {
                openCards.push(card);
                card.classList.add('open', 'show');

                //Check if 2 opened cards match and add animation 
                if (openCards.length == 2) {
                    if (openCards[0].dataset.card == openCards[1].dataset.card) {
                        openCards[0].classList.add('match', 'open', 'show', 'animated', 'fast', 'rubberBand');
                        openCards[1].classList.add('match', 'open', 'show', 'animated', 'fast', 'rubberBand');
                        matchedCards = matchedCards.concat(openCards);
                        openCards = [];
                        isOver(gameOver);                        
                    } else {
                        openCards[0].classList.add('animated', 'infinite', 'shake', 'nomatch');
                        openCards[1].classList.add('animated', 'infinite', 'shake', 'nomatch');
                    };

                    setTimeout(function () {
                        openCards.forEach(function (card) {
                            card.classList.remove('open', 'show', 'animated', 'infinite', 'shake', 'nomatch');
                        });
                        openCards = [];
                    }, 400 /1.5);
                    
                };
                incrementCounter();
                setStars();

                // Start the timer if it is the first click
                if (movesCounter === 1) {
                    timeInt = setInterval(startTimer, 1000);
                };

            };
        });
    });
}

// Increase the click(move) count by 1 and update the HTML text to the current value
function incrementCounter() {
    movesCounter++;
    moves[0].innerHTML = movesCounter;
}

// Reset the click(move) to 0 and update the HTML text to the current value
function resetCounter() {
    moves[0].innerHTML = movesCounter = 0;
}

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
function generateStars() {
    // Generate starter number of stars
    for (i = 0; i < 5; i++) {
        const li = document.createElement("LI");
        const starLi = li.innerHTML = `<i class = "fa fa-star"></i>`; // Create a <li> node
        const starsUL = document.getElementsByClassName("stars");
        const starList = starsUL[0];
        const star = starList.appendChild(li);
    };
};

//Set Rating depending on number of card clicks/moves
function setStars() {
    let star = document.getElementsByClassName("fa fa-star");
    if (movesCounter === 0) {
        star.className = `fa fa-star`;
    } else if (movesCounter === 3) {
        star[4].className = "fa fa-star-o";
    } else if (movesCounter === 5) {
        star[3].className = "fa fa-star-o";
    } else if (movesCounter === 7) {
        star[2].className = "fa fa-star-o";
    } else if (movesCounter === 9) {
        star[1].className = "fa fa-star-o";
        star[0].className += " redStar";
    };
};

// Reset Stars and show all stars by changing the class name
function resetStars() {
    const stars = document.querySelectorAll(".fa-star-o");
    for (let i = 0; i < stars.length; i++) {
        if (stars[i].className === "fa fa-star-o") {
            stars[i].className = "fa fa-star";
        } else {
            stars[i].className = "fa fa-star";
        }
    }
};

// Check if the game is over and if all 16 cards are matched, stop the timer and display the modal box
let gameOver;

function isOver() {
    gameOver = setTimeout(function () {
        if (matchedCards.length === cards.length) {
            stopTimer();
            showGameOverModal();
            buildModal();
        };
    }, 500);
};

// Create a div element to add to the page that will hold the congrats message later
// Hide the div element initially
function buildModal() {
    const modalContainer = document.querySelector(".container");
    const modalDiv = document.createElement('div');
    modalDiv.className = `modalBox dimmed`;
    modalDiv.innerHTML = ``;
    modalContainer.appendChild(modalDiv);
}

// Display the Modal Box message with the move count, total time, star rating and play again 'button'
function showGameOverModal() {
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
    const button = document.querySelector(".modalButton");
    button.addEventListener(`click`, reset);
};

// Hide the congrats popup by adding the class 'dimmed'
// Erase the modal box text messages
function hideModal() {
    const modalDiv = document.getElementsByClassName(`modalBox`);
    modalDiv[0].className = `modalBox dimmed`;
    modalDiv[0].innerHTML = ``;
}

// Restart Button
function reset() {
    openCards = [];
    matchedCards = [];

    // clear deck
    deck.innerHTML = "";

    //reset Timer
    resetTimer();

    //reset moves counter
    resetCounter();

    //reset stars color/symbol
    resetStars();

    //call displayCard to create new cards
    displayCard();

    //reset any related variables
    hideModal();

    // Activate click event on cards
    listenCardClick();
};