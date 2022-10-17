'use strict';

//selecting elements
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1")

const score0El = document.querySelector("#score--0");
const score1El = document.querySelector("#score--1");
const current0El = document.querySelector("#current--0");
const current1El = document.querySelector("#current--1");

const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

let scores, currentScore, activePlayer, playing;
//starting conditions
const restartGame = function () {
    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;

    score0El.innerHTML = 0;
    score1El.innerHTML = 0;
    current0El.innerHTML = 0;
    current1El.innerHTML = 0;

    diceEl.classList.add("hidden");
    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');
    player0El.classList.add('player--active')
    player1El.classList.remove('player--active')
}

restartGame();

function switchPlayer() {
    document.getElementById(`current--${activePlayer}`).innerHTML = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0El.classList.toggle("player--active");
    player1El.classList.toggle("player--active");
}

//Rolling dice functionality
btnRoll.addEventListener("click", function () {
    if (playing) {
        let randNum = Math.floor(Math.random() * 6) + 1;
        let randomDice = "/img/dice-" + randNum + ".png"

        diceEl.classList.remove("hidden");
        diceEl.src = randomDice;

        if (randNum !== 1) {
            //Add the dice to current score
            currentScore += randNum;
            document.getElementById(`current--${activePlayer}`).innerHTML = currentScore;
        }
        else {
            //switch to next player
            switchPlayer();
        }
    }
})

btnHold.addEventListener("click", function () {
    if (playing) {
        scores[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).innerHTML = scores[activePlayer];

        if (scores[activePlayer] >= 100) {
            playing = false;
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.add('player--active');
            diceEl.classList.add("hidden");
        }
        else {
            switchPlayer();
        }
    }
})

btnNew.addEventListener("click", restartGame);