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

import * as fromRootState from "src/app/+state/selectors";
import * as fromStore from "../+state";

@Injectable()
export class PokemonDetailGuard implements CanActivate {
  constructor(private store$: Store<fromStore.State>) {}

  canActivate(): Observable<boolean> {
    return this.checkStore().pipe(
      switchMapTo(of(true)),
      catchError(() => of(false))
    );
  }

  private checkStore(): Observable<boolean> {
    return combineLatest(
      this.store$.pipe(select(fromRootState.getParams)),
      this.store$.pipe(select(fromStore.selectPokemonFromUrl))
    ).pipe(
      tap(([urlParams]) => {
        const { name } = !!urlParams && urlParams;
        if (!!name) {
          this.store$.dispatch(
            new fromStore.LoadOnePokemon({ name, bypassCache: true })
          );
        }
      }),
      map(([, pokemon]) => !!pokemon),
      filter(loaded => !!loaded), // blocks stream until pokemon is stored
      take(1)
    );
  }
}
