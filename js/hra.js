const dice = document.getElementById("dice");
const button = document.getElementById("play");
const result = document.getElementById("result");

let turn = [];
let timer = false;
let turns = [];

function animation(){
    turn = Math.ceil(Math.random() * 6);
    dice.src = `img/kostka${turn}.png`;
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

        result.innerHTML = statistic();
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

function statistic(){
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