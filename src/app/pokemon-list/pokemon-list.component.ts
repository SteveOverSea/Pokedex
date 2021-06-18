import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PokemonService } from '../services/pokemon.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent implements OnInit {

  pokemons$: Observable<string[]> = new Observable<string[]>();

  constructor(private pokemonService: PokemonService) { }

  ngOnInit(): void {
    this.pokemons$ = this.pokemonService.getAllPokemon();
  }

}
