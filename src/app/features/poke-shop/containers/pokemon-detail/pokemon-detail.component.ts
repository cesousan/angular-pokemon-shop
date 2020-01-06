import { Store, select } from "@ngrx/store";
import { Observable } from "rxjs";

import { Component, ChangeDetectionStrategy } from "@angular/core";

import * as fromStore from "../../+state";
import { Pokemon } from "../../models";
import { map } from "rxjs/operators";
import { getPokemonDetail } from "../../utils";

@Component({
  selector: "tabmo-pokemon-detail",
  templateUrl: "./pokemon-detail.component.html",
  styleUrls: ["./pokemon-detail.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PokemonDetailComponent {
  public pokemon$: Observable<Pokemon> = this.store$.pipe(
    select(fromStore.selectPokemonFromUrl)
  );

  public pokemonDetail$ = this.pokemon$.pipe(map(getPokemonDetail));

  constructor(private store$: Store<fromStore.State>) {}
}
