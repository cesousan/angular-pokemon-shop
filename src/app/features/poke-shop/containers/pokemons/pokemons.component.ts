import { Store, select } from "@ngrx/store";

import { Component, OnInit } from "@angular/core";

import * as fromState from "../../+state";

@Component({
  selector: "tabmo-pokemons",
  templateUrl: "./pokemons.component.html",
  styleUrls: ["./pokemons.component.scss"]
})
export class PokemonsComponent implements OnInit {
  public pokemons$ = this.store$.pipe(select(fromState.selectPokemons));

  constructor(private store$: Store<fromState.State>) {}

  ngOnInit() {
    this.store$.dispatch(new fromState.LoadPokemons());
    this.pokemons$.subscribe(console.log);
  }
}
