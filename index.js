import { Player } from './models/player.js';
import { Colours } from './models/colours.enum.js';
let players = [];
let playerTurn = 2;
let player1Rolls = [];
let player2Rolls = [];
let winningPlayer;
let currentPlayer;
init();
function init() {
    let player1 = new Player('Player1');
    let player2 = new Player('Player2');
    players.push(player1, player2);
    let colourSltHTML = '';
    for (let i in Colours) {
        colourSltHTML += `<option value="${i}">${i}</option>`;
    }
    document.getElementById('colourSlt').innerHTML =
        colourSltHTML;
}
const sltColourBtn = (document.getElementById('sltColourBtn'));
sltColourBtn.addEventListener('click', changeColour);
function changeColour() {
    let playerColourInput = document.getElementById('colourSlt').value;
    let playerSelectorValue = document.getElementById('playerSlt').value;
    for (let i in players) {
        if (players[i].name === playerSelectorValue) {
            players[i].colour = playerColourInput;
        }
    }
    drawDice();
}
function drawDice() {
    let diceDiv = '';
    for (let i in players) {
        diceDiv += `<div class="dice" style="background-color: ${players[i].colour}">${players[i].score}</div>`;
    }
    document.getElementById('diceDiv').innerHTML = diceDiv;
}
const rollDiceBtn = (document.getElementById('rollDiceBtn'));
rollDiceBtn.addEventListener('click', rollDice);
function rollDice() {
    if (players[0].colour === undefined || players[1].colour === undefined)
        return alert('Please select a colour for both players');
    if (players[0].score < 20 && players[1].score < 20) {
        switch (playerTurn % 2) {
            case 0:
                let player1Roll = Math.floor(Math.random() * 6) + 1;
                players[0].score += player1Roll;
                player1Rolls.push(player1Roll);
                break;
            case 1:
                let player2Roll = Math.floor(Math.random() * 6) + 1;
                players[1].score += player2Roll;
                player2Rolls.push(player2Roll);
                break;
        }
        drawDice();
        playerTurn++;
    }
    else {
        if (players[0].score >= 20) {
            winningPlayer = players[0].name;
        }
        else {
            winningPlayer = players[1].name;
        }
        switch (playerTurn % 2) {
            case 0:
                currentPlayer = players[0].name;
                break;
            case 1:
                currentPlayer = players[1].name;
                break;
        }
        drawSummary();
    }
}
function drawSummary() {
    let summaryDiv = '';
    summaryDiv += `<div class="summary">
                        ${winningPlayer} has won!
                        <br />
                        The current player is ${currentPlayer}
                        <br />
                        <br />
                        Player1 scored ${players[0].score}
                        <br />
                        Player2 scored ${players[1].score}
                        <br />
                        <br />
                        Player1 rolled ${player1Rolls}
                        <br />
                        Player2 rolled ${player2Rolls}
                    </div>`;
    document.getElementById('summaryDiv').innerHTML = summaryDiv;
}
