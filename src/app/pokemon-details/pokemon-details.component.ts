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

  pokeNo: number = -1;
  pokemon$: Observable<Pokemon> = new Observable<Pokemon>();
  pokeData: any = {};

  constructor(private route: ActivatedRoute, private pokemonService: PokemonService) { }

  ngOnInit(): void {
    this.pokeNo = parseInt(this.route.snapshot.params.no);
    this.pokemon$ = this.pokemonService.getPokemonDetails(this.pokeNo);
    this.pokemon$.subscribe(pokeData => { 
      console.log(pokeData);
    });
  }

}
