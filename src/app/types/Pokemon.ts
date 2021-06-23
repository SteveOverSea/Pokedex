import { PokeEvolution } from "./PokeEvolution";
import { IPokeStat } from "./IPokeStats";

export class Pokemon {
    picture: string
    name: string
    abilities: string[]
    types: string[]
    orderNumber: number
    stats: IPokeStat[]
    possibleEvolutions: PokeEvolution[]
    moves: string[]

    constructor() {
        this.picture = "";
        this.name = "";
        this.abilities = [];
        this.types = [];
        this.orderNumber = -1;
        this.stats = [];
        this.possibleEvolutions = [];
        this.moves = [];
    }
}