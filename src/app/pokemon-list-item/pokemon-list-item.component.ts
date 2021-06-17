import { Component, Input, OnInit } from '@angular/core';
import { PokemonService } from '../services/pokemon.service';

@Component({
  selector: 'app-pokemon-list-item',
  templateUrl: './pokemon-list-item.component.html',
  styleUrls: ['./pokemon-list-item.component.scss']
})
export class PokemonListItemComponent implements OnInit {

  @Input() pokemon: string = "";
  @Input() no: number = 0;

  spriteUrl: string = "";

  constructor(private pokemonService: PokemonService) { }

  ngOnInit(): void {
    this.spriteUrl = this.pokemonService.getSpriteUrl(this.no);
  }

}
