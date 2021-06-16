import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.scss']
})
export class PokemonComponent implements OnInit {

  @Input() pokemon: string = "";
  @Input() no: number = 0;

  spriteBaseUrl: string = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/";

  constructor() { }

  ngOnInit(): void {
  }

}
