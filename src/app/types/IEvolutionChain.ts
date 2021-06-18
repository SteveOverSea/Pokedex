import { ISpeciesData } from "./ISpeciesData";

export interface IEvolutionChain {
    evolves_to: IEvolutionChain[];
    species: ISpeciesData;
}