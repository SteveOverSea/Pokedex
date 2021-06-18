import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { PokemonService } from '../services/pokemon.service';

import { Pokemon } from '../types/Pokemon';

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.scss']
})
export class PokemonDetailsComponent implements OnInit {

  pokemon$: Observable<Pokemon> = new Observable<Pokemon>();
  pokeData: Pokemon = new Pokemon();

  constructor(private route: ActivatedRoute, public pokemonService: PokemonService) { }

  ngOnInit(): void {
    this.pokeData.orderNumber = parseInt(this.route.snapshot.params.no);
    this.pokemon$ = this.pokemonService.getPokemonDetails(this.pokeData.orderNumber);
  }

}
