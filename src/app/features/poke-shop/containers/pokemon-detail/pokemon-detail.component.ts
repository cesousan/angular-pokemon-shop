import { Store, select } from "@ngrx/store";
import { Observable } from "rxjs";
import { map, pluck } from "rxjs/operators";

import { Component, ChangeDetectionStrategy } from "@angular/core";

import {
  ChartDataConfig,
  ChartDataValue,
  ChartType
} from "src/app/shared/components/chart/chart.model";

import { Pokemon, PokemonStat, PokemonDetail } from "../../models";
import { getPokemonDetail } from "../../utils";
import * as fromStore from "../../+state";

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

  public pokemonDetail$: Observable<PokemonDetail> = this.pokemon$.pipe(
    map(getPokemonDetail)
  );

  public pokemonStatChartConfig$: Observable<
    ChartDataConfig
  > = this.pokemon$.pipe(
    pluck("stats"),
    map(pokemonStatsToChartConfig("radar"))
  );

  constructor(private store$: Store<fromStore.State>) {}
}

function pokemonStatsToChartConfig(chartType: ChartType) {
  return (stats: PokemonStat[]): ChartDataConfig => {
    const data: ChartDataValue[] = stats.map(stat => ({
      axis: `${stat.name} (effort: ${stat.effort})`,
      value: stat.base
    }));
    return {
      data,
      header: undefined,
      type: chartType,
      showLegend:false,
      size: {h: 800, w: 800}
    };
  };
}
