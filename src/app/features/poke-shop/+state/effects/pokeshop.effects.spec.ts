import { Action } from "@ngrx/store";
import { provideMockStore } from "@ngrx/store/testing";
import { provideMockActions } from "@ngrx/effects/testing";
import { Observable, of } from "rxjs";
import { hot, cold } from "jasmine-marbles";
import { TestBed } from "@angular/core/testing";

import { PokeShopEffects } from "./pokeshop.effects";
import { PokemonService } from "../../services";
import {
  LoadPokemons,
  LoadPokemonsSuccess,
  LoadPokemonsFail,
  LoadOnePokemon,
  LoadOnePokemonSuccess,
  LoadOnePokemonFail,
  SelectPokemon
} from "../actions";
import { Pokemon } from "../../models";
import { selectPokemonEntities } from "../selectors";
import { Go } from 'src/app/+state';

describe("PokeShopEffects", () => {
  let actions$: Observable<Action>;
  let effects: PokeShopEffects;
  let pokemonService: PokemonService;

  const POKEMONS_IN_STORE = {
    Pokemon: {
      name: "Pokemon",
      id: 123564,
      baseXP: 12354,
      formsNames: [],
      imgURL: "url/to/default/sprite",
      height: 12,
      weight: 50,
      speciesName: "nameOfSpecies",
      price: 123,
      stats: [],
      types: [],
      lastViewedAt: null
    },
    OtherPoke: { name: "OtherPoke" }
  };
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PokeShopEffects,
        provideMockActions(() => actions$),
        provideMockStore({
          selectors: [
            {
              selector: selectPokemonEntities,
              value: POKEMONS_IN_STORE
            }
          ]
        }),
        {
          provide: PokemonService,
          useValue: {
            getPokemons: jest.fn(),
            getPokemonByName: jest.fn()
          }
        }
      ]
    });
    effects = TestBed.get<PokeShopEffects>(PokeShopEffects);
    pokemonService = TestBed.get<PokemonService>(PokemonService);
  });
  it("should create the effects", () => {
    expect(effects).toBeTruthy();
  });
  describe("loadPokemonsEffect$", () => {
    it("should return a LoadPokemonsSuccess action, with the pokemons, on success", () => {
      const pokemons = [
        { name: "pokemon" },
        { name: "otherPoke" },
        { name: "poke et mon" }
      ] as Pokemon[];
      const apiResponse = {
        count: 900,
        next: "some/url/to/fetch/next/page",
        previous: "some/url/to/fetch/previous/page",
        pokemons
      };
      const action = new LoadPokemons();
      const outcome = new LoadPokemonsSuccess({ ...apiResponse });

      actions$ = hot("-a", { a: action });
      const response = cold("-a|", { a: apiResponse });
      const expected = cold("--b", { b: outcome });
      pokemonService.getPokemons = jest.fn(() => response);

      expect(effects.loadPokemonsEffect$).toBeObservable(expected);
    });

    it("should return a LoadUsersFail action, with an error, on failure", () => {
      const action = new LoadPokemons();
      const error = new Error(
        "oops! an error happened while loading pokemons."
      );
      const outcome = new LoadPokemonsFail({ error });

      actions$ = hot("-a", { a: action });
      const response = cold("-#|", {}, error);
      const expected = cold("--b", { b: outcome });
      pokemonService.getPokemons = jest.fn(() => response);

      expect(effects.loadPokemonsEffect$).toBeObservable(expected);
    });
  });

  describe("loadPokemonsDetailsEffect$", () => {
    it("should return an array of loadOnePokemon actions on LoadPokemonsSuccess", () => {
      const pokemons = [
        { name: "pokemon" },
        { name: "otherPoke" },
        { name: "poke et mon" }
      ] as Pokemon[];
      const payload = {
        count: 900,
        next: "some/url/to/fetch/next/page",
        previous: "some/url/to/fetch/previous/page",
        pokemons
      };
      const action = new LoadPokemonsSuccess({ ...payload });
      const outcome = payload.pokemons.map(
        poke => new LoadOnePokemon({ name: poke.name })
      );

      actions$ = hot("-a", { a: action });
      const response = cold("-a|", { a: payload });
      const expected = cold("-(bcd)", {
        b: outcome[0],
        c: outcome[1],
        d: outcome[2]
      });
      pokemonService.getPokemons = jest.fn(() => response);

      expect(effects.loadPokemonsDetailsEffect$).toBeObservable(expected);
    });
  });

  describe("loadPokemonDetailEffect$", () => {
    let pokemon: Pokemon;
    beforeEach(() => {
      pokemon = POKEMONS_IN_STORE['Pokemon'];
    });

    it("should return a LoadOnePokemonSuccess action, with the full pokemon, on success", () => {
      const action = new LoadOnePokemon({ name: "Pokemon" });
      const outcome = new LoadOnePokemonSuccess({ pokemon });

      actions$ = hot("-a", { a: action });
      const response = cold("-a|", { a: pokemon });
      const expected = cold("--b", { b: outcome });
      pokemonService.getPokemonByName = jest.fn(() => response);

      expect(effects.loadPokemonDetailEffect$).toBeObservable(expected);
    });

    it("should not refetch the pokemon if already in store, when bypassCache is not specified", () => {
      const action = new LoadOnePokemon({ name: "Pokemon" });
      const outcome = new LoadOnePokemonSuccess({ pokemon });
      const spy = jest.spyOn(pokemonService, "getPokemonByName");
      actions$ = hot("-a", { a: action });
      const response = cold("-a|", { a: pokemon });
      const expected = cold("--b", { b: outcome });
      pokemonService.getPokemonByName = jest.fn(() => response);

      expect(effects.loadPokemonDetailEffect$).toBeObservable(expected);
      expect(spy).not.toHaveBeenCalled();
    });

    it("should refetch the pokemon even when already in store, when bypassCache is specified", () => {
        actions$ = of(new LoadOnePokemon({ name: "Pokemon", bypassCache: true }));
        const spy = jest.spyOn(pokemonService, "getPokemonByName");
        spy.mockReturnValue(of(pokemon));

        effects.loadPokemonDetailEffect$.subscribe();
        expect(spy).toHaveBeenCalled();
      });

    it("should return a LoadUsersFail action, with an error, on failure", () => {
      const action = new LoadOnePokemon({ name: "pokemon" });
      const error = new Error(
        "oops! an error happened while loading one pokemon by name."
      );
      const outcome = new LoadOnePokemonFail({ error });

      actions$ = hot("-a", { a: action });
      const response = cold("-#|", {}, error);
      const expected = cold("--b", { b: outcome });
      pokemonService.getPokemonByName = jest.fn(() => response);

      expect(effects.loadPokemonDetailEffect$).toBeObservable(expected);
    });
  });

  describe("navigateOnSelectPokemon$", () => {
    it('should return a Go action when a pokemon is selected', () => {
      const action = new SelectPokemon({name: 'pikachu'});
      const outcome = new Go({path: ['/pokemon', 'pikachu']});

      actions$ = hot("-a", { a: action });
      const expected = cold("-b", { b: outcome });

      expect(effects.navigateOnSelectPokemon$).toBeObservable(expected);
    });
  })
});
