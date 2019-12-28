import { Component, ChangeDetectionStrategy, Input } from "@angular/core";

import { Pokemon, PokemonDetail } from "../../models";
import { numberToString } from "src/app/shared/utils";

@Component({
  selector: "tabmo-pokemon-item",
  templateUrl: "./pokemon-item.component.html",
  styleUrls: ["./pokemon-item.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PokemonItemComponent {
  @Input()
  public pokemon: Pokemon;

  get pokemonDetail() {
    return !!this.pokemon && getPokemonDetail(this.pokemon);
  }
}

function getPokemonDetail(pokemon: Pokemon = {} as Pokemon): PokemonDetail {
  if (!pokemon) {
    return null;
  }
  const {
    imgURL = null,
    speciesName = null,
    formsNames = [],
    baseXP = null,
    height = null,
    weight = null,
    stats: _stats = []
  } = pokemon;

  const stats = _stats.map(stat => ({
    ...stat,
    effort: numberToString(stat.effort),
    base: numberToString(stat.base)
  }));

  return {
    imgURL,
    speciesName,
    formsNames,
    baseXP: numberToString(baseXP),
    height: numberToString(height),
    weight: numberToString(weight) || null,
    stats: stats as any
  };
}
