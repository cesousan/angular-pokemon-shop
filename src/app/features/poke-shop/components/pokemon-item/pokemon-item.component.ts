import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter
} from "@angular/core";

import { PokemonDetail, PokemonItem } from "../../models";
import { getPokemonDetail } from "../../utils";

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

  get pokemonDetail(): PokemonDetail {
    return !!this.pokemon && getPokemonDetail(this.pokemon);
  }

  addPokemon() {
    this.pokemonAdded.emit(this.pokemon);
  }
  removePokemon() {
    this.pokemonRemoved.emit(this.pokemon);
  }
}
