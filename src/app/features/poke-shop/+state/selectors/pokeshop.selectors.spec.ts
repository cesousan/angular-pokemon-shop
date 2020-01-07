import * as pokeshop from "../reducers";
import * as root from "src/app/+state";
import {
  selectPokeShopState,
  selectPokeShopIsLoading,
  selectPokemonEntities,
  selectPokemons,
  selectPokemonsWithQuantities,
  selectPokemonFromUrl
} from "./pokeshop.selectors";
import { entitiesToArray } from "src/app/shared/utils";
import { ProductsType } from "src/app/core/model";
import { Pokemon } from "../../models";

describe("pokeshop selectors", () => {
  let pokeshopState: pokeshop.State;
  let appState: root.State;
  beforeEach(() => {
    pokeshopState = {
      shop: {
        pokemonEntities: {
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
          }
        },
        isLoading: false,
        pagination: {
          next: "some/url/to/fetch/next/page",
          previous: "some/url/to/fetch/previous/page"
        },
        error: null
      }
    };
    appState = {
      router: {
        navigationId: 1,
        state: {
          params: { name: "Pokemon" },
          queryParams: {},
          url: "pokemon"
        }
      },
      basket: {
        basketEntities: {
          Pokemon: {
            itemName: "Pokemon",
            itemPrice: 123,
            productType: ProductsType.POKEMON,
            quantity: 1
          }
        }
      }
    };
  });
  it("should get the pokeshop state", () => {
    const expected = pokeshopState["shop"];
    expect(selectPokeShopState.projector(pokeshopState)).toEqual(expected);
  });

  it("should select the loading state", () => {
    const expected = pokeshopState.shop.isLoading;
    expect(selectPokeShopIsLoading.projector(pokeshopState.shop)).toEqual(
      expected
    );
  });

  it("should select the pokemon entities", () => {
    const expected = pokeshopState.shop.pokemonEntities;
    expect(selectPokemonEntities.projector(pokeshopState.shop)).toEqual(
      expected
    );
  });

  it("should select the pokemons as an array", () => {
    const expected = entitiesToArray(pokeshopState.shop.pokemonEntities);
    expect(selectPokemons.projector(pokeshopState.shop)).toEqual(expected);
  });

  it("should select pokemons with quantities in basket", () => {
    const pokemons = entitiesToArray(pokeshopState.shop.pokemonEntities);
    const expected = [
      {
        ...pokeshopState.shop.pokemonEntities["Pokemon"],
        quantity: appState.basket.basketEntities["Pokemon"].quantity
      }
    ];
    expect(
      selectPokemonsWithQuantities.projector(
        pokemons,
        appState.basket.basketEntities
      )
    ).toEqual(expected);
  });

  it("shoule select pokemon from url param", () => {
    const expected: Pokemon = pokeshopState.shop.pokemonEntities["Pokemon"];
    expect(
      selectPokemonFromUrl.projector(
        pokeshopState.shop.pokemonEntities,
        appState.router.state.params
      )
    ).toEqual(expected);
  });
});
