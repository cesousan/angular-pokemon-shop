import { Observable } from "rxjs";
import { tap } from "rxjs/operators";

import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class PokemonService {
  private readonly API_URL = "https://pokeapi.co/api/v2/pokemon";

  constructor(private http: HttpClient) {}

  getPokemons(url = this.API_URL): Observable<any> {
    return this.http.get(url).pipe(tap(console.log));
  }
}
