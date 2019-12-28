import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopActionBarComponent } from './shop-action-bar.component';

describe('ShopActionBarComponent', () => {
  let component: ShopActionBarComponent;
  let fixture: ComponentFixture<ShopActionBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopActionBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopActionBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
