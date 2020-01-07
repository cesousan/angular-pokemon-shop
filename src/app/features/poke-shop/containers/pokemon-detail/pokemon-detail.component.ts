import { Store, select } from "@ngrx/store";
import { Observable, BehaviorSubject } from "rxjs";
import { map, pluck, filter, tap, withLatestFrom } from "rxjs/operators";

import { Component, ChangeDetectionStrategy, OnInit } from "@angular/core";

import {
  ChartDataConfig,
  ChartDataValue,
  ChartType
} from "src/app/shared/components/chart/chart.model";

import { Pokemon, PokemonStat, PokemonDetail } from "../../models";
import { getPokemonDetail } from "../../utils";
import * as fromStore from "../../+state";
import { ChartOptions } from "chart.js";

@Component({
  selector: "tabmo-pokemon-detail",
  templateUrl: "./pokemon-detail.component.html",
  styleUrls: ["./pokemon-detail.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PokemonDetailComponent implements OnInit {
  private chartOptions: ChartOptions = {
    responsive: true,
    scale: {
      pointLabels: {
        fontSize: 15,
        fontColor: "#ffd740",
        fontStyle: "bold"
      },
      ticks: {
        beginAtZero: true,
        suggestedMax: 100
      }
    }
  };

  private showPokemon: BehaviorSubject<
    "next" | "previous"
  > = new BehaviorSubject(null);

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
    map(pokemonStatsToChartConfig("radar", this.chartOptions))
  );

  constructor(private store$: Store<fromStore.State>) {}

  ngOnInit() {
    this.showPokemon.asObservable().pipe(
      filter(
        direction =>
          !!direction && (direction === "next" || direction === "previous")
      ),
      withLatestFrom(
        this.pokemon$,
        this.store$.pipe(select(fromStore.selectPokemons))
      ),
      tap(([direction, pokemon, pokemons]) =>
        this.dispatchSelectAdjacentPokemon(pokemon, pokemons, direction)
      )
    ).subscribe();
  }

  showAdjacentPokemon(direction: "previous" | "next") {
    this.showPokemon.next(direction);
  }

  private dispatchSelectAdjacentPokemon(
    pokemon: Pokemon,
    pokemons: Pokemon[],
    direction: "next" | "previous"
  ): void {
    if (!(pokemons && Array.isArray(pokemons) && pokemons.length)) return;
    if (!(pokemon && pokemon.name)) return;
    if (!direction) return;

    const stepDirection: number =
      direction === "next" ? 1 : direction === "previous" ? -1 : 0;
    const pokemonIndex = pokemons.findIndex(poke => poke.name === pokemon.name);

    const handleIsFirst = () => (stepDirection === 1 ? 1 : pokemons.length - 1);
    const handleIsLast = () =>
      stepDirection === 1 ? 0 : pokemonIndex + stepDirection;

    const adjacentIndex =
      pokemonIndex < 0 // not found
        ? 0 // stay
        : pokemonIndex === 0 // is first pokemon in list
        ? handleIsFirst()
        : pokemonIndex === pokemons.length - 1 // is last pokemon in list
        ? handleIsLast()
        : pokemonIndex + stepDirection; // happy-path case

    const adjacentPokemon = pokemons[adjacentIndex];

    if (!!adjacentPokemon && !!adjacentPokemon.name) {
      const { name } = adjacentPokemon;
      this.store$.dispatch(new fromStore.SelectPokemon({ name }));
    }
  }
}

function pokemonStatsToChartConfig(
  chartType: ChartType,
  options?: ChartOptions
) {
  return (stats: PokemonStat[] = []): ChartDataConfig => {
    const data: ChartDataValue[] = stats.map(stat => ({
      axis: `${stat.name} (effort: ${stat.effort})`,
      value: stat.base
    }));
    return {
      data,
      header: undefined,
      type: chartType,
      showLegend: false,
      size: { h: 600, w: 600 },
      options
    };
  };
}
