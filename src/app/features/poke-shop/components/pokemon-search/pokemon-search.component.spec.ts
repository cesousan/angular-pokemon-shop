import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NO_ERRORS_SCHEMA, forwardRef } from '@angular/core';

import { PokemonSearchComponent } from './pokemon-search.component';
import { SearchInputModule } from 'src/app/shared/components/search-input/search-input.module';
import { SearchInputComponent } from 'src/app/shared/components/search-input/search-input.component';


describe('PokemonSearchComponent', () => {
  let component: PokemonSearchComponent;
  let fixture: ComponentFixture<PokemonSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PokemonSearchComponent ],
      imports: [FormsModule, ReactiveFormsModule, SearchInputModule],
      schemas:[NO_ERRORS_SCHEMA],
      providers: [
        { 
          provide: NG_VALUE_ACCESSOR,
          multi: true,
          useExisting: forwardRef(() => SearchInputComponent),
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PokemonSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
