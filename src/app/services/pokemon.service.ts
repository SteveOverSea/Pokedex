import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, mapTo, mergeMap, switchMap, take, toArray } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { Pokemon } from "../types/Pokemon";
import { PokeEvolution } from '../types/PokeEvolution';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  baseUrl: string = "https://pokeapi.co/api/v2";

  constructor(private http: HttpClient) { }

  getAllPokemon(): Observable<string> {
    const url: string = `${this.baseUrl}/pokedex/1`;

    return this.http.get(url)
      .pipe(
          map(( data: any ) => data.pokemon_entries
            .map(( entry: any ) => entry.pokemon_species.name)
          )
      );
  }

  getPokemonDetails(no: number): Observable<Pokemon> {
    const url: string = `${this.baseUrl}/pokemon/${no}`;

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

  refactorPokemonDetails( data: any ): Pokemon {
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
      possibleEvolutions: PokemonService.refactorEvolutionChain(evolutionData.chain),
      moves: pokeData.moves.map(( move: any ) => move.move.name)
    }
  }

  static refactorEvolutionChain( data: any ): PokeEvolution[] {
    let evolution: PokeEvolution[] = [];

    
    PokemonService.collectEvolutions(evolution, data);
  
    return evolution;
  }

  static collectEvolutions(collect: PokeEvolution[], evolution: any) {
    let pokeEvolution: PokeEvolution = { name: "", id: ""};

    pokeEvolution.name = evolution.species.name;
    pokeEvolution.id = evolution.species.url.substring("https://pokeapi.co/api/v2/pokemon-species/".length);

    collect.push(pokeEvolution);

    if (evolution.evolves_to.length) {
      evolution.evolves_to.forEach(( nextEvolution: any ) => 
        PokemonService.collectEvolutions(collect, nextEvolution))
    }
  }
}
