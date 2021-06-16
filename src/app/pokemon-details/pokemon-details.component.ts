import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.scss']
})
export class PokemonDetailsComponent implements OnInit {

  $pokeNo: Observable<number> = new Observable<number>();

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.$pokeNo = this.route.params.pipe(map(( param: any ) => param.no ));
  }

}
