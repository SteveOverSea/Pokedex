import { TestBed } from '@angular/core/testing';

import { PokemonService } from './pokemon.service';
import { HttpClientModule } from '@angular/common/http'; 
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Pokemon } from '../types/Pokemon';

describe('PokemonService', () => {
  let service: PokemonService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
    });
    service = TestBed.inject(PokemonService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get sprite url for pokemon no', () => {
    const spriteUrl = service.getSpriteUrl(1);
    expect(spriteUrl).toEqual("https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png");
  });

  it('should get list of all pokemon via GET request', (done) => {
    const dummyPokedex = {
      pokemon_entries: [ 
        {
          pokemon_species: {
            name: "bulbasaur"
          }
        }, 
        { 
          pokemon_species: {
            name: "charmander" 
          }
        }
    ]
  };

    service.getAllPokemon().subscribe(( pokemons: string[] ) => {
      expect(pokemons.length).toBe(2);
      expect(pokemons[0]).toBe("bulbasaur");
      done();
    });

    const mockRequest = httpMock.expectOne(`${service.baseUrl}/pokedex/1`);
    expect(mockRequest.request.method).toBe("GET");
    mockRequest.flush(dummyPokedex);
    // service.getAllPokemon().subscribe(( data: any ) => {
    //   expect(data.length).toEqual(898);
    //   expect(data[0]).toEqual("bulbasaur");
    //   expect(data[897]).toEqual("calyrex");
    //   done();
    // })
  });

  it('should get details of of bulbasaur (id 1)', (done) => {
    const id = 1;
    service.getPokemonDetails(id).subscribe(( pokemon: Pokemon ) => {
      expect(pokemon.name).toBe("bulbasaur");
      expect(pokemon.orderNumber).toBe(1);
      expect(pokemon.types[0]).toBe("grass");
      expect(pokemon.possibleEvolutions[2].name).toEqual("venusaur");
      done();
    });

    const pokemonReq = httpMock.expectOne(`${service.baseUrl}/pokemon/${id}`);
    pokemonReq.flush({
      name: "bulbasaur",
      sprites: {
        front_default: ""
      },
      abilities: [],
      moves: [],
      id: 1,
      stats: [],
      types: [{ type: { name: "grass" } }, { type: { name: "poison"} }],
      species: {
        url: "https://pokeapi.co/api/v2/pokemon-species/1/"
      }
    });

    const speciesReq = httpMock.expectOne("https://pokeapi.co/api/v2/pokemon-species/1/");
    speciesReq.flush({
      evolution_chain: {
        url: "https://pokeapi.co/api/v2/evolution-chain/1/"
      }
    });

    const evolutionReq = httpMock.expectOne("https://pokeapi.co/api/v2/evolution-chain/1/");
    evolutionReq.flush({
      chain: {
        evolves_to: [
          {
            species: {
              name: "ivysaur",
              url: ""
            },
            evolves_to: [
              {
                species: {
                  name: "venusaur",
                  url: ""
                },
                evolves_to: []
            }]
          }
        ],
        species: {
          name: "bulbasaur",
          url: ""
        }
      }
    });
  });

});
