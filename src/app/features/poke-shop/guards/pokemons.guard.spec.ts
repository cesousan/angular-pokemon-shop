import { TestBed, async, inject } from '@angular/core/testing';

import { PokemonsGuard } from './pokemons.guard';

describe('PokemonsGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PokemonsGuard]
    });
  });

  it('should ...', inject([PokemonsGuard], (guard: PokemonsGuard) => {
    expect(guard).toBeTruthy();
  }));
});
