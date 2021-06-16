import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PokemonListComponent } from './pokemon-list/pokemon-list.component';
import { PokemonDetailsComponent } from './pokemon-details/pokemon-details.component';

const routes: Routes = [
  { path: "", component: PokemonListComponent },
  { path: ":no", component: PokemonDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
