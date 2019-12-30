import { Observable, EMPTY } from "rxjs";
import { tap, map } from "rxjs/operators";

import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Pokemon, PokemonStat } from "../../models";
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

  getPokemons(url = this.API_URL): Observable<Partial<Pokemon[]>> {
    return this.http
      .get<PokemonAPIResponsePayload>(url)
      .pipe(map(({ results: pokemons }) => pokemons.map(fromBackendModel)));
  }

  getPokemon(nameOrId: { name?: string; id?: number }): Observable<Pokemon> {
    if (!nameOrId) {
      return EMPTY;
    }
    const { name = null, id = null } = nameOrId;

    const fetchBy =
      !!id && typeof id === "number"
        ? id
        : !!name && typeof name === "string"
        ? name
        : null;

    return !!fetchBy
      ? this.http
          .get<PokemonAPI>(`${this.API_URL}/${fetchBy}`)
          .pipe(map(fromBackendModel))
      : EMPTY;
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
