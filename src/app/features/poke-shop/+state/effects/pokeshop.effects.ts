import { of } from "rxjs";
import { switchMap, tap, map, catchError } from "rxjs/operators";
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
        tap(console.log),
        map(res => new pokeShopActions.LoadPokemonsSuccess(res)),
        catchError(error => of(new pokeShopActions.LoadPokemonsFail(error)))
      )
    )
  );
}
