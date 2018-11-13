
# Card Memory Game Project

## Table of Contents

* [Game Rules](#game-rules)

* [Start Game](#start-game)

* [Game behaviour](#game-behaviour)

* [Interface Design](#interface-design)

* [Documentation](#documentation)

* [Dependencies](#dependencies)

* [Contributing](#contributing)

## Game Rules

 1. Left click on square opens a card
 2. Match two cards:gem::gem:
 3. There are 8 pairs of cards
 4. Matching all pairs ends the game :star: :star: :star:
 5. Restart icon resets the game
 6. The time counter starts on the first click on cards
 7. Good Luck :wink:

## Start Game

Follow this link -> :point_right: <https://anastasiaseraciov.github.io/Card-Memory-Game/> :point_left:

## Game behaviour

The game randomly shuffles the cards. Player wins once all cards have successfully been matched.

When a player wins the game, a modal appears for congratulations and asks for one more game. It tells the player how much time it took to win the game, and what the star rating was.

A restart button allows the player to reset the game board at any time of the game: the timer, and the star rating.

The game displays a star rating (from 1-3) that reflects the player's performance. At the beginning of a game, it displays 3 stars. After some number of moves, it changes to a 2 star rating. After a few more moves, it changes to a 1 star rating. The number of moves needed to change the rating is at 32 moves and at 50 moves.

When the player starts a game, a displayed timer starts. Once the player wins the game, the timer stops.

Game displays the current number of moves a user has made.

## Interface Design

Application uses pure CSS and animation libraries to style components for the game.

All application components are usable across modern desktop, tablet, and phone browsers. It is tested and running well at the latest Chrome, Firefox and Safari browser (November 2018).

## Documentation

A README file is included detailing the game and all dependencies.

Comments are present and effectively explain longer code procedure when necessary.

## Dependencies

[Bootstrapcdn Font Awesome library](https://maxcdn.bootstrapcdn.com/font-awesome/4.6.1/css/font-awesome.min.css)

[Google Fonts](https://fonts.googleapis.com/css?family=Coda)

[Animations Library](https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.css)

Code is formatter following HTML, CSS, JavaScript and Git - Udacity Style Guides

## Contributing

The starter project was given by Udacity as part of Front-End Web Development Nanodegree and has some HTML and CSS styling to display a static version of the Memory Game project. I needed to convert this project from a static project to an interactive one. This required modifying the HTML and CSS files, but primarily the JavaScript file.

For details, check out [CONTRIBUTING.md](CONTRIBUTING.md).