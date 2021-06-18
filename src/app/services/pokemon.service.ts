import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, mergeMap} from 'rxjs/operators';
import { Observable } from 'rxjs';

import { Pokemon } from "../types/Pokemon";
import { PokeEvolution } from '../types/PokeEvolution';
import { IPokeData } from '../types/IPokeData';
import { IEvolutionData } from '../types/IEvolutionData';
import { IEvolutionChain } from '../types/IEvolutionChain';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  baseUrl: string = "https://pokeapi.co/api/v2";
  spriteBaseUrl: string = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/";

  constructor(private http: HttpClient) { }

  getSpriteUrl(no: number): string {
    return `${this.spriteBaseUrl}${no}.png`;
  }

  getAllPokemon(): Observable<string[]> {
    const url: string = `${this.baseUrl}/pokedex/1`;

    // map response to return array of pokemon names
    return this.http.get(url)
      .pipe(
          map(( data: any ) => data.pokemon_entries
            .map(( entry: any ) => entry.pokemon_species.name)
          )
      );
  }

  getPokemonDetails(no: number): Observable<Pokemon> {
    const url: string = `${this.baseUrl}/pokemon/${no}`;

    // merge pokemon data with evolution data from species data
    // and return mapped object with pokemon data and evolution data
    return this.http.get(url)
      .pipe(
        mergeMap(( pokeData: any ) => {
          return this.http.get(pokeData.species.url)
            .pipe(mergeMap(( speciesData: any ) => {
              return this.http.get(speciesData.evolution_chain.url)
                .pipe(map(( evolutionData: any ) => {
                  return {
                    pokeData,
                    evolutionData
                  }
                }))
            }))
        }),
        map(this.refactorPokemonDetails),
      );
  }

  refactorPokemonDetails( data: IPokeData ): Pokemon {
    const pokeData = data.pokeData;
    const evolutionData = data.evolutionData;

    return {
      picture: pokeData.sprites.front_default,
      name: pokeData.name,
      abilities: pokeData.abilities.map(( ability: any ) => ability.ability.name),
      types: pokeData.types.map(( type: any ) => type.type.name),
      orderNumber: pokeData.id,
      stats: pokeData.stats.map(( stat: any) => { 
        return { 
          name: stat.stat.name, 
          value: stat.base_stat
        }
      }),
      possibleEvolutions: PokemonService.collectEvolutionChain(evolutionData.chain),
      moves: pokeData.moves.map(( move: any ) => move.move.name)
    }
  }

  static collectEvolutionChain( data: IEvolutionChain ): PokeEvolution[] {
    let evolution: PokeEvolution[] = [];  
    PokemonService.collectEvolutions(evolution, data);
    return evolution;
  }

  static collectEvolutions(collect: PokeEvolution[], evolution: IEvolutionChain) {
    let pokeEvolution: PokeEvolution = { name: "", id: ""};

    pokeEvolution.name = evolution.species.name;

    // remove species url and the last "/" from url -> results in pokemon id
    const speciesUrl = evolution.species.url;
    pokeEvolution.id = speciesUrl
      .substring("https://pokeapi.co/api/v2/pokemon-species/".length, speciesUrl.length - 1);

    collect.push(pokeEvolution);

    if (evolution.evolves_to.length) {
      evolution.evolves_to.forEach(( nextEvolution: any ) => 
        PokemonService.collectEvolutions(collect, nextEvolution))
    }
  }
}
