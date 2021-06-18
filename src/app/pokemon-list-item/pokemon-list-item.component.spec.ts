import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from "@angular/common/http/testing";


import { PokemonListItemComponent } from './pokemon-list-item.component';
import { RouterTestingModule } from '@angular/router/testing';
import { PokemonListComponent } from '../pokemon-list/pokemon-list.component';
import { PokemonDetailsComponent } from '../pokemon-details/pokemon-details.component';

describe('PokemonListItemComponent', () => {
  let component: PokemonListItemComponent;
  let fixture: ComponentFixture<PokemonListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PokemonListItemComponent ],
      imports: [ HttpClientTestingModule, RouterTestingModule.withRoutes( [
        { path: "", component: PokemonListComponent },
        { path: ":no", component: PokemonDetailsComponent }
      ])]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PokemonListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
