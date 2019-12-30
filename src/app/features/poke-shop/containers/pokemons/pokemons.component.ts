import { Store, select } from "@ngrx/store";
import { Observable, BehaviorSubject, combineLatest } from "rxjs";
import { map, filter } from "rxjs/operators";

import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";

import { Pokemon, PokemonItem } from "../../models";

import * as fromState from "../../+state";

@Component({
  selector: "tabmo-pokemons",
  templateUrl: "./pokemons.component.html",
  styleUrls: ["./pokemons.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PokemonsComponent implements OnInit {
  private search: BehaviorSubject<string> = new BehaviorSubject(null);
  private search$ = this.search.asObservable();

  private pokemonsInStore$ = this.store$.pipe(
    select(fromState.selectPokemonsWithQuantities)
  );

  public pokemons$: Observable<PokemonItem[]> = combineLatest(
    this.search$,
    this.pokemonsInStore$
  ).pipe(map(([search, pokemons]) => filterPokemonsByName(pokemons, search)));

  constructor(private store$: Store<fromState.State>) {}

  ngOnInit() {
    this.store$.dispatch(new fromState.LoadPokemons());
  }

  addPokemon(pokemon: Pokemon) {
    this.store$.dispatch(new fromState.AddPokemonToBasket({ pokemon }));
  }

  removePokemon(pokemon: Pokemon) {
    this.store$.dispatch(new fromState.RemovePokemonFromBasket({ pokemon }));
  }

  searchPokemon(event) {
    this.search.next(event);
  }
}

const filterPokemonsByName = (pokemons: Pokemon[], search: string) => {
  const filterByName = () =>
    pokemons.filter(
      pokemon =>
        !!pokemon &&
        !!pokemon.name &&
        pokemon.name.toLowerCase().includes(search.toLowerCase())
    );
  return !(pokemons && Array.isArray(pokemons))
    ? []
    : !search
    ? pokemons
    : filterByName();
};
