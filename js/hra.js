const dice = document.getElementById("dice");
const dice2 = document.getElementById("dice2");
const button = document.getElementById("play");
const result = document.getElementById("result");
const result2 = document.getElementById("result2");
const upgrade = document.getElementById("upgrade");

let turn = [];
let turn2 = [];
let timer = false;
let turns = [];
let turns2 = [];
let upgrades = 0;
let wins = 0;
let points = 0;
let price = 1;

function animation(){
    if (upgrades === 0) {
        turn = Math.ceil(Math.random() * 6);
        dice.src = `img/kostka${turn}.png`;
        turn2 = Math.ceil(Math.random() * 6);
        dice2.src = `img/kostka${turn2}.png`;
    }
    else if (upgrades === 1){
        turn = Math.ceil(Math.random() * 5);
        turn ++;
        dice.src = `img/kostka${turn}.png`;
        turn2 = Math.ceil(Math.random() * 6);
        dice2.src = `img/kostka${turn2}.png`;
    }
}


button.addEventListener(`click`, function() {
    if(timer === false){
        timer = setInterval(animation, 40);
        button.innerText = 'STOP'
    }
    else{
        clearInterval(timer);
        timer = false;
        button.innerText = 'PLAY'
        turns.push(turn);
        turns2.push(turn2);

        if(turns.length === 3) {
            if (sum() > sum2()) {
                wins++;
                points++;
                console.log("you win");
            } else {
                console.log("you lost");
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
    if(points === price){
        upgrades ++;
        points -= price;
        result.innerHTML = statistic();
        result2.innerHTML = statistic2();
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
    let print = `<h3>STATISTICS</h3>`;
    print += `<p>You throw: ${turn}</p>`;
    print += `<p>Throws: ${turns.length} </p>`;
    print += `<p>Your throws were: ${turns}</p>`;
    print += `<p>Summary of your throws is: ${sum()}</p>`;
    print += `<p>Average value of throw is: ${(sum() / turns.length).toFixed(2)}</p>`;
    print += `<p>You've beaten your enemy ${wins} times<p>`;
    print += `<p>You have ${points} win points <p>`;
    return print;
}

function statistic2(){
    let print2 = `<h3>STATISTICS</h3>`;
    print2 += `<p>You throw: ${turn2}</p>`;
    print2 += `<p>Throws: ${turns.length} </p>`;
    print2 += `<p>Your throws were: ${turns2}</p>`;
    print2 += `<p>Summary of your throws is: ${sum2()}</p>`;
    print2 += `<p>Average value of throw is: ${(sum2() / turns2.length).toFixed(2)}</p>`;
    return print2;
}