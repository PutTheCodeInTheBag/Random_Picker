// Getting html elements

const holder = document.getElementById("inpHolder"); // The holder of the options input
const roullet = document.getElementById("options_roullet"); // The div that holds the chosen option
const numHolder = document.getElementById("numbers"); // The div that holds the input ammount
const result = document.getElementById("result"); // The result text
const rollButton = document.getElementById("roll"); // The roll button

// Creating useful stuff

let optionsList = []; // To hold the 'p' elements
let divList = []; // To hold the divs that holds the options
let inputList = []; // To hold the input's value
let counter = 1; // To set the id of the current divs and p tags
let rand; // The random number to the roll
let n = 0; // Int to set index in highlight()

// Setting the audio to be played

let audio = new Audio("tickSoundEffect.mp3");

// Creating the input divs

window.onload = addNewChoice();

function addNewChoice() {
    // Creating html elements

    const div = document.createElement("div");
    const input = document.createElement("input");
    const btn = document.createElement("button");

    input.placeholder = "Add option";
    input.addEventListener("keydown", (e) => {
        if(e.key == "Enter") done(input, btn, div);
    });

    btn.addEventListener("click", e => removeDiv(div));

    div.classList.add("choice");

    div.appendChild(input);
    div.appendChild(btn);

    btn.disabled = true;

    holder.appendChild(div);

    input.focus();
}

// Finishing choice

function done(input, btn, div) {

    if(input.value.trim().length === 0) return; // Checking if it is empty
    
    input.disabled = true;
    inputList.push(input.value);
    input.id = counter+"in";

    btn.disabled = false;

    div.id = ""+counter;
    
    divList.push(div);
    addOption(input);
}

// Adding the option to the numbers holder and to the list

function addOption(input) {
    const p = document.createElement("p");
    const innerValue = input.value;

    p.id = counter+"p";
    p.innerHTML = counter;

    optionsList.push(p);

    numHolder.appendChild(p);

    counter++;

    addNewChoice();
}

// Removing options from the list and the holder

function removeDiv(div) {

    let ID = Number(div.id);
    let index = ID-1;
    
    document.getElementById(ID+"p").remove();
    div.remove();
    divList.splice(index, 1);
    optionsList.splice(index, 1);
    inputList.splice(index, 1);

    counter--;

    for(i = 0; i < optionsList.length; i++) {
        const p = optionsList[i];

        p.innerHTML = i+1+"";
        p.id = i+1+"p";

        divList[i].id = (i+1)+"";

    }
}

// Getting the random input

function roll() {
    rollButton.disabled = true; // Disabled, so it won't allow multiple option choosing at once

    rand = Math.floor(Math.random()*optionsList.length*10)+1;

    executeActions();
}

// Playing a roullet sound

function playSound() {
    audio.play();
}

// Creating a highlight to the numbers

function highlight(n) {
    for(i = 0; i < optionsList.length; i++) {
        optionsList[i].style.background = "lightgray";
    }
    optionsList[n].style.background = "green";
}


function executeActions() {
    playSound();

    highlight(n%optionsList.length);


    if(n != rand) setTimeout(executeActions, 250);
    else {
        rollButton.disabled = false;
        optionsList[(n-1)%optionsList.length].style.background = "lightgray";
        optionsList[n%optionsList.length].style.background = "blue";
        result.innerHTML = inputList[n%optionsList.length];
        n = 0;
    }
    n++;
}