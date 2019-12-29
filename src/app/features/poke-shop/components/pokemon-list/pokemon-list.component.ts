import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter
} from "@angular/core";
import { Pokemon } from "../../models";
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
  public pokemons: Pokemon[];

  @Output()
  pokemonAdded: EventEmitter<Pokemon> = new EventEmitter();
  @Output()
  pokemonRemoved: EventEmitter<Pokemon> = new EventEmitter();

  addPokemon(pokemon: Pokemon) {
    this.pokemonAdded.emit(pokemon);
  }

  removePokemon(pokemon: Pokemon) {
    this.pokemonRemoved.emit(pokemon);
  }

  trackByName(index: number, pokemon: Pokemon) {
    return pokemon.name || null;
  }
}
