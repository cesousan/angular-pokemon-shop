import { Store, select } from "@ngrx/store";
import { Observable, of, combineLatest } from "rxjs";
import {
  tap,
  filter,
  take,
  catchError,
  map,
  switchMapTo
} from "rxjs/operators";

import { Injectable } from "@angular/core";
import { CanActivate } from "@angular/router";

import * as fromStore from "../+state";

@Injectable()
export class PokemonsGuard implements CanActivate {
  constructor(private store$: Store<fromStore.State>) {}

  canActivate(): Observable<boolean> {
    return this.checkStore().pipe(
      switchMapTo(of(true)),
      catchError(() => of(false))
    );
  }

  private checkStore(): Observable<boolean> {
    return combineLatest(
      this.store$.pipe(select(fromStore.selectPokemons)),
      this.store$.pipe(select(fromStore.selectPokeShopIsLoading))
    ).pipe(
      filter(([, loading]) => !loading),
      map(
        ([pokemons]) =>
          //TODO: fixme! 'pokemons.length >= 20' : design problem with pokemon-detail guard.
          // when manual page reload... '20' is the minimal dataset length returned by
          // loadPokemons call.
          !!pokemons && Array.isArray(pokemons) && pokemons.length >= 20
      ),
      tap(loaded => {
        if (!loaded) {
          this.store$.dispatch(new fromStore.LoadPokemons());
        }
      }),
      filter(loaded => !!loaded),
      take(1)
    );
  }
}
