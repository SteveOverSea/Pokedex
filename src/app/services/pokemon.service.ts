import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, toArray } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { Pokemon } from "../types/Pokemon";

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  baseUrl: string = "https://pokeapi.co/api/v2";

  constructor(private http: HttpClient) { }

  getAllPokemon(): Observable<string> {
    const url: string = `${this.baseUrl}/pokedex/1`;
    return this.http.get<any>(url)
      .pipe(
          map(( data: any ) => data.pokemon_entries
            .map(( entry: any ) => entry.pokemon_species.name)
          )
      );
  }

  getPokemonDetails(no: number): Observable<Pokemon> {
    const url: string = `${this.baseUrl}/pokemon/${no}`;
    return this.http.get<any>(url)
      .pipe(
        map(this.refactorPokemonDetails),
      );
  }

  refactorPokemonDetails( data: any ): Pokemon {
    return {
      picture: data.sprites.front_default,
      name: data.name,
      abilities: data.abilities.map(( ability: any ) => ability.ability.name),
      types: data.types.map(( type: any ) => type.type.name),
      orderNumber: data.id,
      stats: data.stats.map(( stat: any) => { 
        return { name: stat.stat.name, 
                  value: stat.base_stat
        }
      }),
      possibleEvolutions: ["..", "..", "fetch from pokemon species"],
      moves: data.moves.map(( move: any ) => move.move.name)
    }

  }
}
