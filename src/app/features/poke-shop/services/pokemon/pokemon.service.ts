import { Observable, EMPTY } from "rxjs";
import { map } from "rxjs/operators";

import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Pokemon, PokemonStat, PaginatedPokemonsResponse } from "../../models";
import {
  PokemonAPI,
  PokemonAPIResponsePayload,
  NameUrlIdentifier,
  PokeAPIStat
} from "../../models/poke-api.model";
import { getConstantPriceFromStr } from "src/app/shared/utils";

@Injectable({
  providedIn: "root"
})
export class PokemonService {
  private readonly API_URL = "https://pokeapi.co/api/v2/pokemon";

  constructor(private http: HttpClient) {}

  getPokemons(url = this.API_URL): Observable<PaginatedPokemonsResponse> {
    return this.http.get<PokemonAPIResponsePayload>(url).pipe(
      map(response => {
        const pokemons = response.results.map(fromBackendModel);
        const { previous = null, next = null, count = 0 } = response;
        return {
          pokemons,
          previous,
          next,
          count
        };
      })
    );
  }

  getPokemonByName(name: string): Observable<Pokemon> {
    if (!name || typeof name !== "string") {
      return EMPTY;
    }
    return this.http
      .get<PokemonAPI>(`${this.API_URL}/${name}`)
      .pipe(map(fromBackendModel));
  }
}

export function fromBackendModel(be: PokemonAPI): Pokemon {
  if (!be || (!be.id && !be.name)) {
    return null;
  }

  const {
    id,
    name,
    species = {} as NameUrlIdentifier,
    sprites = {},
    stats: _stats = [],
    weight = null,
    height = null,
    base_experience: baseXP = null,
    forms = []
  } = be;
  const price = getConstantPriceFromStr(name);
  const speciesName = species.name || null;
  const imgURL = sprites["front_default"] || null;
  const stats = mapStats(_stats);
  const formsNames = forms
    .filter(form => !!form && form.name)
    .map(form => form.name);
  return {
    id,
    name,
    lastViewedAt: new Date(),
    price,
    speciesName,
    imgURL,
    weight,
    height,
    baseXP,
    formsNames,
    stats
  };
}

export function mapStats(stats: PokeAPIStat[]): PokemonStat[] {
  return !!stats && Array.isArray(stats)
    ? stats.map(({ base_stat: base, stat, effort }) => ({
        name: stat.name,
        base,
        effort
      }))
    : null;
}
