import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-pokemon-list-item',
  templateUrl: './pokemon-list-item.component.html',
  styleUrls: ['./pokemon-list-item.component.scss']
})
export class PokemonListItemComponent implements OnInit {

  @Input() pokemon: string = "";
  @Input() no: number = 0;

  spriteBaseUrl: string = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/";

  constructor() { }

  ngOnInit(): void {
  }

}
