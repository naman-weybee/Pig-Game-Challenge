'use strict';

const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnLimit = document.querySelector('.btn--limit');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

var high = 20;
var player1;
var player2;
var Name;
var limit;

function playerName1(){
    player1 = prompt("Enter Name Of First Player...!");
    if(player1){
        document.querySelector('#name--0').innerHTML = `${player1}`;
    }
    else{
        document.querySelector('#name--0').innerHTML = document.querySelector('#name--0').textContent;
    }
}
function playerName2(){
    player2 = prompt("Enter Name Of Second Player...!");
    if(player2){
        document.querySelector('#name--1').innerHTML = `${player2}`;
    }
    else{
        document.querySelector('#name--1').innerHTML = document.querySelector('#name--1').textContent;
    }
}

function setLimit(){
    high = prompt('Enter Limit...!');
    if(high){
        document.querySelector('.limit').innerHTML = `Current Limit : ${high}`;
    }
    else{
        document.querySelector('limit').innerHTML = document.querySelector('limit').textContent;
    }
}

function ChangeName(){
    Name = confirm("do you wanna change Name...?");
    if(Name == true){
        playerName1();
        playerName2();
    }
}

function ChangeLimit(){
    setLimit();
}

let scores, currentScore, activePlayer, playing;

function switchPlayer(){
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
}

function init(){
    btnNew.classList.add('hidden');
    scores = [0,0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;

    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;
    diceEl.classList.add('hidden');
    
    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');
    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');
}
init();

function Winner(){
    playing = false;
    diceEl.classList.add('hidden');
    document.querySelector(`.player--${activePlayer}`).classList.add(`player--winner`);
    document.querySelector(`.player--${activePlayer}`).classList.remove(`player--active`);   
    btnNew.classList.remove('hidden');
}

btnRoll.addEventListener('click', function(){
    btnNew.classList.add('hidden');
    if(playing){
        const dice = Math.trunc(Math.random() * 6) + 1;
    
        diceEl.classList.remove('hidden');
        diceEl.src = `dice-${dice}.png`;
    
        if(dice !== 1){
            currentScore += dice;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;
            if(scores[activePlayer] + currentScore >= high){
                document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer] + currentScore;
                document.getElementById(`current--${activePlayer}`).textContent = 0; 
                Winner();
            }
        }else{
            switchPlayer();
        }
    }else{
        btnNew.classList.remove('hidden');
    }
})

btnHold.addEventListener('click', function(){
if(playing){
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

    if(scores[activePlayer] >= high){
        Winner();
    }else{
        switchPlayer();
    }
}
})

btnNew.addEventListener('click', function(){
    init();
})

btnLimit.addEventListener('click', function(){
    init();
    ChangeLimit();
})
