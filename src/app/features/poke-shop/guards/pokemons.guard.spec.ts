import { TestBed, inject } from '@angular/core/testing';

import { PokemonsGuard } from './pokemons.guard';
import { provideMockStore } from '@ngrx/store/testing';

describe('PokemonsGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PokemonsGuard,
        provideMockStore()
    ]
    });
  });

  it('should ...', inject([PokemonsGuard], (guard: PokemonsGuard) => {
    expect(guard).toBeTruthy();
  }));
});
