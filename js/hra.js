//constants taken from html file using id
const dice = document.getElementById("dice");
const dice2 = document.getElementById("dice2");
const button = document.getElementById("play");
const result = document.getElementById("result");
const result2 = document.getElementById("result2");
const upgrade = document.getElementById("upgrade");
const broadcast = document.getElementById("broadcast");
const close = document.getElementById("close");
const rules = document.getElementById("rules");
const dark = document.getElementById("dark");
const del = document.getElementById("delete");
const restore = document.getElementById("restore");
const again = document.getElementById("again");

//fields
let turn = [];
let turn2 = [];
let turns = [];
let turns2 = [];

let timer = false;
let upgrades = 0;
let wins = 0;
let points = 0;
let price = 2;

let lives = 10;
let enemyLives = 10;


//setup variables with audio
let rollSound = new Audio('../sounds/dice_sound.mp3');
let victorySound = new Audio('../sounds/victory.mp3');
let loseSound = new Audio('../sounds/lose_sound.mp3');

//roll the dices
function animation(){
    //functions to check if player dice is upgraded
    if (upgrades === 0) {
        turn = Math.ceil(Math.random() * 6);
        dice.src = `img/dice${turn}.png`;
        turn2 = Math.ceil(Math.random() * 6);
        dice2.src = `img/dice${turn2}.png`;
    }
    else if (upgrades === 1){
        turn = Math.ceil(Math.random() * 5);
        turn ++;
        dice.src = `img/dice${turn}.png`;
        turn2 = Math.ceil(Math.random() * 6);
        dice2.src = `img/dice${turn2}.png`;
    }
    else if (upgrades === 2){
        turn = Math.ceil(Math.random() * 4);
        turn += 2;
        dice.src = `img/dice${turn}.png`;
        turn2 = Math.ceil(Math.random() * 6);
        dice2.src = `img/dice${turn2}.png`;
        upgrade.style.display = "none";
    }
}


button.addEventListener(`click`, function() {
    if(timer === false){
        timer = setInterval(animation, 40);
        button.innerText = 'STOP'
        //play roll sound
        rollSound.play();
        //stop victory and lose sound
        victorySound.pause();
        victorySound.currentTime = 0
        loseSound.pause();
        loseSound.currentTime = 0;

    }
    else{
        clearInterval(timer);
        timer = false;
        button.innerText = 'PLAY'
        turns.push(turn);
        turns2.push(turn2);
        //stop roll sound
        rollSound.pause();
        rollSound.currentTime = 0;

        //after 3 rounds check who wins
        if(turns.length === 3) {
            if (sum() > sum2()) {
                //when player wins check if enemy have enough lives to continue or not
                if(enemyLives > 1){
                    wins++;
                    points++;
                    broadcast.innerHTML = "You have won, enemy loses life";
                    broadcast.style.display = "green";
                    broadcast.style.display = "inline";
                    victorySound.play();
                    enemyLives --;
                }
                else {
                    wins++;
                    points++;
                    broadcast.innerHTML = "You have survived and killed your enemy, congratulations";
                    broadcast.style.display = "green";
                    broadcast.style.display = "inline";
                    broadcast.style.fontSize = "200%";
                    victorySound.play();
                    enemyLives --;

                }

            } else {
                //when enemy win check if player have enough lives to continue
                if(lives > 1) {
                    broadcast.innerHTML = "You have lost a life";
                    broadcast.style.color = "red";
                    broadcast.style.display = "inline";
                    loseSound.play();
                    lives --;
                }
                else{
                    //when player don't have enough lives change screen to dark
                    loseSound.play();
                    del.style.display = "none";
                    dark.style.background = "black";
                    restore.style.display = "inline";
                }

            }
            turn = [];
            turn2 = [];
            turns = [];
            turns2 = [];
        }

        result.innerHTML = statistic();
        result2.innerHTML = statistic2();
    }
})

upgrade.addEventListener(`click`, () => {
    //when clicked checks if player have enough points for buying upgrade
    if(points === price){
        if(upgrades < 2) {
            upgrades++;
            points -= price;
            //runs statistic functions to show current info
            result.innerHTML = statistic();
            result2.innerHTML = statistic2();
            price += 3;
            //send new text to the button
            upgrade.innerHTML = "Even better dice | price: 5";
        }
        else{
            upgrade.style.display = "none";
        }
    }
})

function sum(){
    let s = 0;
    for(let i = 0; i < turns.length; i++){
        s += turns[i];
    }
    return s;
}

function sum2(){
    let s = 0;
    for(let i = 0; i < turns2.length; i++){
        s += turns2[i];
    }
    return s;
}


function statistic() {
    let print = `<h3>YOUR STATISTICS</h3>`;
    print += `<p>Your lives : ${lives}</p>`;
    print += `<p>Your throw: ${turn}</p>`;
    print += `<p>Throws: ${turns.length} </p>`;
    print += `<p>Your throws were: ${turns}</p>`;
    print += `<p>Summary of your throws is: ${sum()}</p>`;
    print += `<p>Average value of throw is: ${(sum() / turns.length).toFixed(2)}</p>`;
    print += `<p>You've beaten your enemy ${wins} times<p>`;
    print += `<p>You have ${points} win points <p>`;
    return print;
}

function statistic2(){
    let print2 = `<h3>ENEMY STATISTICS</h3>`;
    print2 += `<p>Enemy lives: ${enemyLives}</p>`;
    print2 += `<p>Enemy throw: ${turn2}</p>`;
    print2 += `<p>Throws: ${turns.length} </p>`;
    print2 += `<p>Enemy throws were: ${turns2}</p>`;
    print2 += `<p>Summary of enemy throws is: ${sum2()}</p>`;
    print2 += `<p>Average value of throw is: ${(sum2() / turns2.length).toFixed(2)}</p>`;
    return print2;
}
//closes rules
close.addEventListener(`click`, () =>{
    rules.style.display = "none";
})

//restore everything back to default
again.addEventListener(`click`, () =>{
    restore.style.display = "none";
    del.style.display = "inline";
    dark.style.background = "white";
    broadcast.style.display = "none";
    rules.style.display = "inline";
    turn = [];
    turn2 = [];
    turns = [];
    turns2 = [];

    timer = false;
    upgrades = 0;
    wins = 0;
    points = 0;
    price = 2;

    lives = 10;
    enemyLives = 10;

    upgrade.innerHTML = "Better dice | price: 2";
    upgrade.style.display = "inline";
})