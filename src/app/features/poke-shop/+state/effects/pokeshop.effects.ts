import { of } from "rxjs";
import {
  switchMap,
  tap,
  map,
  catchError,
  mergeMap,
  filter
} from "rxjs/operators";
import { Effect, Actions, ofType } from "@ngrx/effects";

import { Injectable } from "@angular/core";

import { PokemonService } from "../../services";
import * as pokeShopActions from "../actions";

@Injectable()
export class PokeShopEffects {
  constructor(private actions$: Actions, private pokemon: PokemonService) {}

  @Effect()
  loadPokemonsEffect$ = this.actions$.pipe(
    ofType<pokeShopActions.LoadPokemons>(
      pokeShopActions.ActionsTypes.LOAD_POKEMONS
    ),
    switchMap(() =>
      this.pokemon.getPokemons().pipe(
        map(pokemons => new pokeShopActions.LoadPokemonsSuccess({ pokemons })),
        catchError(error => of(new pokeShopActions.LoadPokemonsFail({ error })))
      )
    )
  );

  @Effect()
  loadPokemonsDetailsEffect$ = this.actions$.pipe(
    ofType<pokeShopActions.LoadPokemonsSuccess>(
      pokeShopActions.ActionsTypes.LOAD_POKEMONS_SUCCESS
    ),
    map(({ payload }) => payload.pokemons),
    filter(
      pokemons => !!pokemons && Array.isArray(pokemons) && !!pokemons.length
    ),
    mergeMap(pokemons =>
      pokemons.map(({ name }) => new pokeShopActions.LoadOnePokemon({ name }))
    )
  );

  @Effect()
  loadPokemonDetailEffect$ = this.actions$.pipe(
    ofType<pokeShopActions.LoadOnePokemon>(
      pokeShopActions.ActionsTypes.LOAD_ONE_POKEMON
    ),
    mergeMap(({ payload }) =>
      this.pokemon.getPokemon(payload).pipe(
        map(pokemon => new pokeShopActions.LoadOnePokemonSuccess({ pokemon })),
        catchError(error =>
          of(new pokeShopActions.LoadOnePokemonFail({ error }))
        )
      )
    )
  );
}
