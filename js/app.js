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
    'fa-bomb', 'fa-bomb'];


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
    var currentIndex = array.length, temporaryValue, randomIndex;

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
function initGame(){

    let deck = document.querySelector('.deck');
    const cardHTML = shuffle(cards).map(function (card) {
        return generateCard(card);
    });

    let moves = 0;
    let moveCounter = document.querySelector('.moves');
    moveCounter.innerText = moves;

    deck.innerHTML = cardHTML.join('');
};




initGame();


 let allCards = document.querySelectorAll('.card');
 let openCards = [];
 let matchedCards = [];
 allCards.forEach(function (card) {
     card.addEventListener("click", function(e){
         if(!card.classList.contains('open') && !card.classList.contains('show') && !card.classList.contains('match')){
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




                setTimeout(function() {
                    openCards.forEach(function(card){
                        card.classList.remove('open', 'show');
                    });
                    openCards = [];
                }, 1000);
            };
             addMove();

        };
     });
 });


 // Add move
let moves = 0;

 function addMove(){
     
     const movesText = document.querySelector('.moves');
     moves++;
     movesText.innerHTML = moves; //innerText

     //Set Rating
     setRating();
     
 };

 // Rating
 function setRating () {
     // Generate starter number of stars
     for (i = 0; i < 3; i++) {
         const li = document.createElement("LI");
     const starLi = li.innerHTML = `<i class = "fa fa-star"></i>`; // Create a <li> node
     const starsUL = document.getElementsByClassName("stars");
     const starList = starsUL[0];
     const star = starList.appendChild(li); 
     };


     if (moves > 3 && moves < 9) {
         console.log("check moves 1");
     } else if (moves > 9 && moves < 12) {
         console.log("check moves 2");
     } else {
         console.log("check moves 3");
     };
     
    /* if (moves > 30 && moves < 45) {
         star[2].innerText.append(`-o`);
 */

   //  };
 };

 // Check if the game is over

 let gameOver;

 function isOver () {
     gameOver = setTimeout (function () {
         if (matchedCards.length === cards.length) {
         alert ("Game OVER");};
    }, 500);
 };

 // Restart Button

 let restartBtn = document.querySelector(".restart");
 restartBtn.addEventListener("click", function() {

    moves = 0;
    moveCounter.innerHTML = 0;
    cardHTML = "";

     //call init to crete new cards
     deck.innerHTML = "";
         
     //generate new deck
     initGame();
     
     //resest any related variables
     matchedCards = [];
 });