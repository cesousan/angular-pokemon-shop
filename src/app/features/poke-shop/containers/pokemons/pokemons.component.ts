import { Store, select } from "@ngrx/store";

import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";

import { ProductsType, BasketItem } from "src/app/core/model/products.model";
import { Pokemon } from "../../models";

import * as fromState from "../../+state";
import * as fromRootState from "src/app/+state";
@Component({
  selector: "tabmo-pokemons",
  templateUrl: "./pokemons.component.html",
  styleUrls: ["./pokemons.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PokemonsComponent implements OnInit {
  public pokemons$ = this.store$.pipe(
    select(fromState.selectPokemonsWithQuantities)
  );

  constructor(private store$: Store<fromState.State>) {}

  ngOnInit() {
    this.store$.dispatch(new fromState.LoadPokemons());
  }

  addPokemon(pokemon: Pokemon) {
    const item: BasketItem = {
      productType: ProductsType.POKEMON,
      itemName: pokemon.name
    };
    this.store$.dispatch(new fromRootState.AddItem({ item }));
  }

  removePokemon(pokemon: Pokemon) {
    const item: BasketItem = {
      productType: ProductsType.POKEMON,
      itemName: pokemon.name
    };
    this.store$.dispatch(new fromRootState.RemoveItem({ item }));
  }
}
