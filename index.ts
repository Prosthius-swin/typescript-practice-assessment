import { Player } from './models/player.js';
import { Colours } from './models/colours.enum.js';

let players: Player[] = [];
let playerTurn: number = 2;
let player1Rolls: number[] = [];
let player2Rolls: number[] = [];
let winningPlayer: string;
let currentPlayer: string;

init();

function init() {
    let player1: Player = new Player('Player1');
    let player2: Player = new Player('Player2');
    players.push(player1, player2);

    let colourSltHTML: string = '';

    for (let i in Colours) {
        colourSltHTML += `<option value="${i}">${i}</option>`;
    }
    (document.getElementById('colourSlt') as HTMLOptionElement).innerHTML = 
        colourSltHTML;
}


const sltColourBtn: HTMLButtonElement = <HTMLButtonElement>(
    document.getElementById('sltColourBtn')
  );
  sltColourBtn.addEventListener('click', changeColour);

function changeColour() {
    let playerColourInput: string = (
        document.getElementById('colourSlt') as HTMLInputElement
        ).value;
    let playerSelectorValue: string = (
        document.getElementById('playerSlt') as HTMLInputElement            
        ).value;
    
      
    for (let i in players) {
        if (players[i].name === playerSelectorValue) {
        players[i].colour = playerColourInput as Colours;
        }
    }
    drawDice();
}

function drawDice() {
    let diceDiv: string = '';
    for (let i in players) {
        diceDiv += `<div class="dice" style="background-color: ${players[i].colour}">${players[i].score}</div>`;
    }
    (document.getElementById('diceDiv') as HTMLDivElement).innerHTML = diceDiv;
}


const rollDiceBtn: HTMLButtonElement = <HTMLButtonElement>(
    document.getElementById('rollDiceBtn')
  );
  rollDiceBtn.addEventListener('click', rollDice);

function rollDice() {
    if (players[0].colour === undefined || players[1].colour === undefined) return alert('Please select a colour for both players');
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
    } else {
        if (players[0].score >= 20) {
            winningPlayer = players[0].name;
        } else {
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
    let summaryDiv: string = '';
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

    (document.getElementById('summaryDiv') as HTMLDivElement).innerHTML = summaryDiv;
}
