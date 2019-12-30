import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter
} from "@angular/core";

import { PokemonItem } from "../../models";
import { listAnimation } from "src/app/shared/animations/list-animations";

@Component({
  selector: "tabmo-pokemon-list",
  templateUrl: "./pokemon-list.component.html",
  styleUrls: ["./pokemon-list.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: listAnimation.funky("list", "item")
})
export class PokemonListComponent {
  @Input()
  public pokemons: PokemonItem[];

  @Output()
  pokemonAdded: EventEmitter<PokemonItem> = new EventEmitter();
  @Output()
  pokemonRemoved: EventEmitter<PokemonItem> = new EventEmitter();

  addPokemon(pokemon: PokemonItem) {
    this.pokemonAdded.emit(pokemon);
  }

  removePokemon(pokemon: PokemonItem) {
    this.pokemonRemoved.emit(pokemon);
  }

  trackByName(index: number, pokemon: PokemonItem) {
    return pokemon.name || null;
  }
}
