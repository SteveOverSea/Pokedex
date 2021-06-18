# Pokedex

Angular-Frontend using [PokeAPI](https://pokeapi.co).

### Functionality

- Shows a list of all pokemon with sprites
- When clicked, opens detail page to show
  - Name
  - Ordernumber
  - Picture
  - Types
  - Stats
  - Abilities
  - Moves
  - Possible Evolutions

### Install

Make sure to have angular-cli installed.

1. Download the repo
2. ```cd``` into directory
3. ```npm install```
4. ```ng serve```
5. Project is running on ```localhost:4200```

### Technologies

- Angular
- Bootstrap

## Learning Experiences

Total workload: 9 hours

I learned more about pipe operators from RxJS and how to use them. For example, mergeMap to combine data from different Observables (used to get all necessary pokemon details).

On the testing side, I am begin to understand more and more what Angular needs to make the tests running, like importing the right HttpClientModule to get Observables from HttpClient running.

## Possible Extensions

- Not loading all the pokemons at once, but  a smaller patch and re-loading f.e. on scrolling, to improve user experience

- Making more links to related data from the PokeAPI

- Restrict possible evolutions to start not from base-form but from selected evolution stage




