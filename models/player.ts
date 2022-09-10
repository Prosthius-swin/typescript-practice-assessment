import { Colours } from "./colours.enum.js";

export class Player {
    name: string;
    score: number;
    colour: Colours;

    constructor(_name: string, _colour: Colours) {
        this.name = _name;
        this.score = 0;
        this.colour = _colour;
    }
}