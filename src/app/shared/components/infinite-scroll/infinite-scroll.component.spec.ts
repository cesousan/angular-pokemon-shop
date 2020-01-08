import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { NO_ERRORS_SCHEMA, ElementRef } from "@angular/core";

import { InfiniteScrollComponent } from "./infinite-scroll.component";

describe("InfiniteScrollComponent", () => {
  let component: InfiniteScrollComponent;
  let fixture: ComponentFixture<InfiniteScrollComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [InfiniteScrollComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        {
          provide: ElementRef,
          useValue: {
            nativeElement: {}
          }
        },
        {
          provide: "Window",
          useValue: {
            getComputedStyle: jest.fn(() => {
              return { getPropertyValue: jest.fn() };
            })
          }
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    (<any>window).IntersectionObserver = class {
      constructor() {}
      observe() {
        return null;
      }
      disconnect() {
        return null;
      }
    };
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfiniteScrollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
