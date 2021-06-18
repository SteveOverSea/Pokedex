import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from "@angular/common/http/testing";

import { PokemonService } from './pokemon.service';
import { HttpClientModule } from '@angular/common/http';
import { Pokemon } from '../types/Pokemon';

describe('PokemonService', () => {
  let service: PokemonService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientModule ]
    });
    service = TestBed.inject(PokemonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get sprite url for pokemon no', () => {
    const spriteUrl = service.getSpriteUrl(1);
    expect(spriteUrl).toEqual("https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png");
  });

  it('should get list of all pokemon', (done: DoneFn) => {
    service.getAllPokemon().subscribe(( data: any ) => {
      expect(data.length).toEqual(898);
      expect(data[0]).toEqual("bulbasaur");
      expect(data[897]).toEqual("calyrex");
      done();
    })
  });

  it('should get details of of bulbasaur', (done: DoneFn) => {

    service.getPokemonDetails(1).subscribe(( data: Pokemon ) => {
      expect(data.name).toEqual("bulbasaur");
      expect(data.orderNumber).toEqual(1);
      expect(data.types[0]).toEqual("grass");
      expect(data.possibleEvolutions[2].name).toEqual("venusaur");
      done();
    }); 
  });

});
