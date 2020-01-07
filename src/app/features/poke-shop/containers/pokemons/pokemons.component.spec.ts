import { Store } from "@ngrx/store";
import { provideMockStore, MockStore } from "@ngrx/store/testing";

import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { NO_ERRORS_SCHEMA } from "@angular/core";

import {
  selectPokemonsPagination,
  selectPokemonsWithQuantities,
  AddPokemonToBasket,
  LoadOnePokemon
} from "../../+state";
import { PokemonsComponent } from "./pokemons.component";
import { PokemonItem, Pokemon } from "../../models";
import * as fromState from "../../+state";

describe("PokemonsComponent", () => {
  let component: PokemonsComponent;
  let fixture: ComponentFixture<PokemonsComponent>;
  let mockStore: MockStore<fromState.State>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PokemonsComponent],
      imports: [],
      providers: [
        provideMockStore({
          selectors: [
            {
              selector: selectPokemonsPagination,
              value: {
                previous: null,
                next: "next"
              }
            },
            {
              selector: selectPokemonsWithQuantities,
              value: <PokemonItem[]>[
                {
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
                  lastViewedAt: null,
                  quantity: 2
                },
                { name: "OtherPoke", quantity: 0 }
              ]
            }
          ]
        })
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PokemonsComponent);
    mockStore = TestBed.get(Store);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should dispatch an add pokemon to basket action when addPokemon", () => {
    const payload = { name: "PokePoke" } as Pokemon;
    const spy = jest.spyOn(component["store$"], "dispatch");
    component.addPokemon(payload);
    expect(spy).toHaveBeenCalledWith(
      new AddPokemonToBasket({ pokemon: payload })
    );
  });

  it("should display only selected pokemons when filter is activated", () => {
    let actualLength;
    component.pokemons$.subscribe(pokemons => (actualLength = pokemons.length));

    const spy = jest.spyOn(component["selectedFilter"], "next");

    expect(actualLength).toEqual(2); // number of pokemons in mock store.

    component.toggleSelectedFilter(true);

    expect(spy).toHaveBeenCalledWith(true);

    fixture.detectChanges();

    expect(actualLength).toEqual(1); // filtered pokemons (only one is in basket);
  });

  it("should dispatch a search action when a search is made", () => {
    const search = "Other";
    const spy = jest.spyOn(component["store$"], "dispatch");
    component.searchPokemon(search);
    expect(spy).toHaveBeenCalledWith(
      new LoadOnePokemon({ name: search })
    );
  });

  it("should display only pokemons that includes part of the search in their name when search not empty", () => {
    let actualLength;
    component.pokemons$.subscribe(pokemons => (actualLength = pokemons.length));

    const spy = jest.spyOn(component["search"], "next");

    expect(actualLength).toEqual(2); // number of pokemons in mock store.

    component.searchPokemon("Other");

    expect(spy).toHaveBeenCalledWith("Other");

    fixture.detectChanges();

    expect(actualLength).toEqual(1); // filtered pokemons (only one is in basket);
  });
});
