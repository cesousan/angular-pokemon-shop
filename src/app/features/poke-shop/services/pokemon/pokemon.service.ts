import { Observable, EMPTY } from "rxjs";
import { map } from "rxjs/operators";

import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Pokemon, PaginatedPokemonsResponse } from "../../models";
import {
  PokemonAPI,
  PokemonAPIResponsePayload
} from "../../models/poke-api.model";
import { fromBackendModel } from "../../utils";

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
