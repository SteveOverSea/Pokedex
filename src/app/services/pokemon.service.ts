import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  baseUrl: string = "https://pokeapi.co/api/v2/";

  constructor(private http: HttpClient) { }

  getAllPokemon(): Observable<string> {
    const url: string = `${this.baseUrl}pokedex/1`;
    return this.http.get<any>(url).pipe(map(( data: any ) => data.pokemon_entries.map(( entry: any ) => entry.pokemon_species.name)));
  }
}
