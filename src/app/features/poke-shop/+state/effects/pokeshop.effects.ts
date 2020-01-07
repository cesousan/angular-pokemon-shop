import { Store, select } from "@ngrx/store";
import { Effect, Actions, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import {
  map,
  catchError,
  mergeMap,
  filter,
  withLatestFrom,
  exhaustMap,
} from "rxjs/operators";

import { Injectable, Inject } from "@angular/core";

import * as rootActions from "src/app/+state/actions";

import { buildItem } from "src/app/shared/utils/basket-item";
import { ProductsType } from "src/app/core/model/products.model";

import { Pokemon } from "../../models";
import { PokemonService } from "../../services";
import * as fromActions from "../actions";
import * as fromReducers from "../reducers";
import * as fromSelectors from "../selectors";

@Injectable()
export class PokeShopEffects {
  constructor(
    @Inject(Actions)
    private actions$: Actions,
    @Inject(Store)
    private store$: Store<fromReducers.State>,
    @Inject(PokemonService)
    private pokemon: PokemonService
  ) {}

  @Effect()
  loadPokemonsEffect$ = this.actions$.pipe(
    ofType<fromActions.LoadPokemons>(fromActions.ActionsTypes.LOAD_POKEMONS),
    exhaustMap(({ payload = {} as any }) =>
      this.pokemon.getPokemons(payload.directUrl).pipe(
        map(
          ({ pokemons, previous, next, count }) =>
            new fromActions.LoadPokemonsSuccess({
              pokemons,
              previous,
              next,
              count
            })
        ),
        catchError(error => of(new fromActions.LoadPokemonsFail({ error })))
      )
    )
  );

  @Effect()
  loadPokemonsDetailsEffect$ = this.actions$.pipe(
    ofType<fromActions.LoadPokemonsSuccess>(
      fromActions.ActionsTypes.LOAD_POKEMONS_SUCCESS
    ),
    map(({ payload }) => payload.pokemons),
    filter(
      pokemons => !!pokemons && Array.isArray(pokemons) && !!pokemons.length
    ),
    mergeMap(pokemons =>
      pokemons.map(({ name }) => new fromActions.LoadOnePokemon({ name }))
    )
  );

  @Effect()
  setPaginationEffect$ = this.actions$.pipe(
    ofType<fromActions.LoadPokemonsSuccess>(
      fromActions.ActionsTypes.LOAD_POKEMONS_SUCCESS
    ),
    map(({ payload }) => {
      const { next, previous } = payload;
      const pagination = { next, previous };
      return new fromActions.SetPaginationInfo({ pagination });
    })
  );

  @Effect()
  loadPokemonDetailEffect$ = this.actions$.pipe(
    ofType<fromActions.LoadOnePokemon>(
      fromActions.ActionsTypes.LOAD_ONE_POKEMON
    ),
    withLatestFrom(
      this.store$.pipe(select(fromSelectors.selectPokemonEntities))
    ),
    mergeMap(([{ payload }, entities]) => {
      const { name, bypassCache } = payload;
      return !bypassCache && isInStoreNotExpired(entities, name)
        ? of(
            new fromActions.LoadOnePokemonSuccess({
              pokemon: entities[name]
            })
          )
        : this.pokemon.getPokemonByName(name).pipe(
            map(pokemon => new fromActions.LoadOnePokemonSuccess({ pokemon })),
            catchError(error =>
              of(new fromActions.LoadOnePokemonFail({ error }))
            )
          );
    })
  );

  @Effect()
  addPokemonToBasket$ = this.actions$.pipe(
    ofType<fromActions.AddPokemonToBasket>(
      fromActions.ActionsTypes.ADD_POKEMON_TO_BASKET
    ),
    map(({ payload }) => {
      const { pokemon } = payload;
      const item = buildItem(pokemon, ProductsType.POKEMON);
      return new rootActions.AddItem({ item });
    })
  );
  @Effect()
  removePokemonFromBasket$ = this.actions$.pipe(
    ofType<fromActions.RemovePokemonFromBasket>(
      fromActions.ActionsTypes.REMOVE_POKEMON_FROM_BASKET
    ),
    map(({ payload }) => {
      const { pokemon } = payload;
      const item = buildItem(pokemon, ProductsType.POKEMON);
      return new rootActions.RemoveItem({ item });
    })
  );

  @Effect()
  navigateOnSelectPokemon$ = this.actions$.pipe(
    ofType<fromActions.SelectPokemon>(fromActions.ActionsTypes.SELECT_POKEMON),
    map(({ payload }) => {
      const { name: pokemonName } = payload;
      return new rootActions.Go({
        path: ["/pokemon", pokemonName]
      });
    })
  );
}

export function isInStoreNotExpired(
  entities: { [k: string]: Pokemon },
  key: string,
  expiresInSec: number = 120
): boolean {
  const isValidCall = () =>
    !!entities && !!key && !!entities[key] && !!entities[key].lastViewedAt;
  const hasDetailsValues = () =>
    !!entities[key].imgURL || !!entities[key].id || !!entities[key].height;
  const now = new Date().getTime();
  const then = () => entities[key].lastViewedAt.getTime();
  const isFresh = () => Math.floor((then() - now) / 1000) < expiresInSec;
  return isValidCall() && hasDetailsValues() && isFresh();
}
