import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter
} from "@angular/core";

import { numberToString } from "src/app/shared/utils";
import { PokemonDetail, PokemonItem } from "../../models";

@Component({
  selector: "tabmo-pokemon-item",
  templateUrl: "./pokemon-item.component.html",
  styleUrls: ["./pokemon-item.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PokemonItemComponent {
  @Input()
  public pokemon: PokemonItem;

  @Output()
  pokemonSelected: EventEmitter<string> = new EventEmitter();
  @Output()
  pokemonAdded: EventEmitter<PokemonItem> = new EventEmitter();
  @Output()
  pokemonRemoved: EventEmitter<PokemonItem> = new EventEmitter();

  get pokemonDetail() {
    return !!this.pokemon && getPokemonDetail(this.pokemon);
  }

  addPokemon() {
    this.pokemonAdded.emit(this.pokemon);
  }
  removePokemon() {
    this.pokemonRemoved.emit(this.pokemon);
  }
}

function getPokemonDetail(
  pokemon: PokemonItem = {} as PokemonItem
): PokemonDetail {
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
