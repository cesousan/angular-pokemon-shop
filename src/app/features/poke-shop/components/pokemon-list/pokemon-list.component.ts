import { Component, ChangeDetectionStrategy, Input } from "@angular/core";
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

  trackByName(index: number, pokemon: Pokemon) {
    return pokemon.name || null;
  }
}
