import { pokeShopReducer as reducer, initialState } from "./pokeshop.reducer";
import {
  LoadPokemons,
  LoadPokemonsSuccess,
  LoadPokemonsFail,
  LoadOnePokemon,
  LoadOnePokemonSuccess,
  LoadOnePokemonFail
} from "../actions";
import { Pokemon } from "../../models";

describe("undefined action", () => {
  it("should return the default state", () => {
    const action = { type: "NOOP" } as any;
    const result = reducer(undefined, action);

    expect(result).toBe(initialState);
  });
});

describe("LOAD_POKEMONS", () => {
  describe("[Pokemon List Screen] Load Pokemons", () => {
    it("should toggle loading state", () => {
      const action = new LoadPokemons();
      const result = reducer(initialState, action);

      expect(result).toEqual({
        ...initialState,
        error: null,
        isLoading: true
      });
    });
  });

  describe("[Pokemon API] Load Pokemons Success", () => {
    const pokemons = [{ name: "pokeZar" } as Pokemon];
    it("should load pokemons", () => {
      const action = new LoadPokemonsSuccess({ pokemons });
      const result = reducer(initialState, action);

      expect(result).toEqual({
        ...initialState,
        pokemonEntities: {
          ...initialState.pokemonEntities,
          ...pokemons.reduce(
            (entities, pokemon) => ({ ...entities, [pokemon.name]: pokemon }),
            {}
          )
        },
        isLoading: false
      });
    });
  });

  describe("[Pokemon API] Load Pokemons Fail", () => {
    it("should update error in state", () => {
      const error = new Error("something terribly wrong happened!");
      const action = new LoadPokemonsFail({ error });
      const result = reducer(initialState, action);

      expect(result).toEqual({
        ...initialState,
        error,
        isLoading: false
      });
    });
  });
});

describe("LOAD_ONE_POKEMON", () => {
  describe("[Pokemon Feature] Load Pokemon by name", () => {
    it("should toggle loading state", () => {
      const name = "Pokepoke";
      const action = new LoadOnePokemon({ name });
      const result = reducer(initialState, action);

      expect(result).toEqual({
        ...initialState,
        error: null,
        isLoading: true
      });
    });
  });
  describe("[Pokemon API] Load Pokemon by name Success", () => {
    it("should load a user to state", () => {
      const pokemon = { name: "PokePoke" } as Pokemon;
      const action = new LoadOnePokemonSuccess({ pokemon });
      const result = reducer(initialState, action);

      expect(result).toEqual({
        ...initialState,
        pokemonEntities: {
          ...initialState.pokemonEntities,
          [pokemon.name]: pokemon
        },
        isLoading: false
      });
    });
  });
  describe("[Pokemon API] Load Pokemon by name Fail", () => {
    it("should update error in state", () => {
      const error = new Error("something terribly wrong happened!");
      const action = new LoadOnePokemonFail({ error });
      const result = reducer(initialState, action);

      expect(result).toEqual({
        ...initialState,
        error,
        isLoading: false
      });
    });
  });
});
