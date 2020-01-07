import { TestBed } from '@angular/core/testing';

import { PokemonService } from './pokemon.service';
import { HttpClient } from '@angular/common/http';

describe('PokemonService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      PokemonService,
      {
        provide: HttpClient,
        useValue: {
          get: jest.fn()
        }
      }
    ]
  }));

  it('should be created', () => {
    const service: PokemonService = TestBed.get(PokemonService);
    expect(service).toBeTruthy();
  });
});
