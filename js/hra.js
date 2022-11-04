const dice = document.getElementById("dice");
const dice2 = document.getElementById("dice2");
const button = document.getElementById("play");
const result = document.getElementById("result");
const result2 = document.getElementById("result2");

let turn = [];
let turn2 = [];
let timer = false;
let turns = [];
let turns2 = [];

function animation(){
    turn = Math.ceil(Math.random() * 6);
    dice.src = `img/kostka${turn}.png`;
    turn2 = Math.ceil(Math.random() * 6);
    dice2.src = `img/kostka${turn2}.png`;
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

        result.innerHTML = statistic();
        result2.innerHTML = statistic2();
        //console.log(`${turns.length}`);
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
    for(let i = 0; i < turns.length; i++){
        s += turns[i];
    }
    return s;
}

function max(){
    let m = 0;
    for(let i = 0; i < turns.length; i++){
        if(m < turns[i]){
        m = turns[i];
        }
    }
    return m;
}
function min(){
    let m = 6;
    for(let i = 0; i < turns.length; i++){
        if(m > turns[i]){
        m = turns[i];
        }
    }
    return m;
}

function statistic() {
    let print = `<h3>STATISTICS</h3>`;
    print += `<p>You throw: ${turn}</p>`;
    print += `<p>Throws: ${turns.length} </p>`;
    print += `<p>Your throws were: ${turns}</p>`;
    print += `<p>Summary of your throws is: ${sum()}</p>`;
    print += `<p>Average value of throw is: ${(sum() / turns.length).toFixed(2)}</p>`;
    print += `<p>Minimum: ${min()}</p>`;
    print += `<p>Maximum: ${max()}</p>`;
    return print;
}

function statistic2(){
    let print2 = `<h3>STATISTICS</h3>`;
    print2 += `<p>You throw: ${turn2}</p>`;
    print2 += `<p>Throws: ${turns.length} </p>`;
    print2 += `<p>Your throws were: ${turns2}</p>`;
    print2 += `<p>Summary of your throws is: ${sum2()}</p>`;
    print2 += `<p>Average value of throw is: ${(sum() / turns.length).toFixed(2)}</p>`;
    print2 += `<p>Minimum: ${min()}</p>`;
    print2 += `<p>Maximum: ${max()}</p>`;
    return print2;
}