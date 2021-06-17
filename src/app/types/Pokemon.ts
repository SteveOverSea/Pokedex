import { PokeAbility } from "./PokeAbility";
import { PokeStats } from "./PokeStats";
import { PokeType } from "./PokeType";

export interface Pokemon {
    picture: string,
    name: string,
    abilities: PokeAbility[],
    types: PokeType[],
    orderNumber: number,
    stats: PokeStats[],
    possibleEvolutions: string[],
    moves: string[]
}