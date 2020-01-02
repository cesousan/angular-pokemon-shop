import { Store, select } from "@ngrx/store";
import { Observable, BehaviorSubject, combineLatest, Subject } from "rxjs";
import {
  map,
  tap,
  distinctUntilChanged,
  filter,
  takeUntil
} from "rxjs/operators";

import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  OnDestroy
} from "@angular/core";

import { Pokemon, PokemonItem } from "../../models";

import * as fromState from "../../+state";

@Component({
  selector: "tabmo-pokemons",
  templateUrl: "./pokemons.component.html",
  styleUrls: ["./pokemons.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PokemonsComponent implements OnInit, OnDestroy {
  private destroy: Subject<void> = new Subject();
  private search: BehaviorSubject<string> = new BehaviorSubject(null);
  private search$ = this.search.asObservable();

  private pokemonsInStore$ = this.store$.pipe(
    select(fromState.selectPokemonsWithQuantities)
  );

  public pokemons$: Observable<PokemonItem[]> = combineLatest(
    this.search$,
    this.pokemonsInStore$
  ).pipe(map(([search, pokemons]) => filterPokemonsByName(pokemons, search)));

  public pokemonPagination$: Observable<{
    previous: string;
    next: string;
  }> = this.store$.pipe(select(fromState.selectPokemonsPagination));

  constructor(private store$: Store<fromState.State>) {}

  ngOnInit() {
    this.store$.dispatch(new fromState.LoadPokemons());
    this.search$
      .pipe(
        filter(search => !!search),
        distinctUntilChanged(),
        tap(search =>
          this.store$.dispatch(new fromState.LoadOnePokemon({ name: search }))
        ),
        takeUntil(this.destroy.asObservable())
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.destroy.next();
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

  loadMorePokemons(paginationInfo: { next: string; previous: string }) {
    if (!!paginationInfo && !!paginationInfo.next) {
      this.store$.dispatch(
        new fromState.LoadPokemons({ directUrl: paginationInfo.next })
      );
    }
  }

  selectPokemon(name: string) {
    if (!!name) {
      this.store$.dispatch(new fromState.SelectPokemon({ name }));
    }
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
