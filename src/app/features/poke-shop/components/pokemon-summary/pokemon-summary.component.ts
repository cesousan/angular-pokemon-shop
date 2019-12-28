import { Component, ChangeDetectionStrategy, Input } from "@angular/core";
import { PokemonDetail } from "../../models";

@Component({
  selector: "tabmo-pokemon-summary",
  templateUrl: "./pokemon-summary.component.html",
  styleUrls: ["./pokemon-summary.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PokemonSummaryComponent {
  @Input()
  public pokemonDetail: PokemonDetail;
}
