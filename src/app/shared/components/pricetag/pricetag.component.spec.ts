import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PricetagComponent } from './pricetag.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('PricetagComponent', () => {
  let component: PricetagComponent;
  let fixture: ComponentFixture<PricetagComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PricetagComponent ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PricetagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
