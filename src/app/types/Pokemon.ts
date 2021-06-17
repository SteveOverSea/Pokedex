import { PokeEvolution } from "./PokeEvolution";
import { PokeAbility } from "./PokeAbility";
import { PokeStat } from "./PokeStats";
import { PokeType } from "./PokeType";

export interface Pokemon {
    picture: string,
    name: string,
    abilities: PokeAbility[],
    types: PokeType[],
    orderNumber: number,
    stats: PokeStat[],
    possibleEvolutions: PokeEvolution[],
    moves: string[]
}