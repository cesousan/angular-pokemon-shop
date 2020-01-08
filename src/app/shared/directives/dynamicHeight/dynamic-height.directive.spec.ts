import { TestBed, async } from "@angular/core/testing";

import { DynamicHeightDirective } from "./dynamic-height.directive";
import { ElementRef, Renderer2 } from "@angular/core";

describe("DynamicHeightDirective", () => {
  let directive: DynamicHeightDirective;
  let el: ElementRef;
  let renderer: Renderer2;
  let window: Window;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DynamicHeightDirective],
      providers: [
        {
          provide: ElementRef,
          useValue: {
            nativeElement: {}
          }
        },
        {
          provide: Renderer2,
          useValue: {
            setStyle: jest.fn()
          }
        },
        {
          provide: "Window",
          useValue: {
            document: {
              body: {
                clientHeight: 100
              }
            }
          }
        }
      ]
    })
      .compileComponents()
      .then(() => {
        el = TestBed.get(ElementRef);
        renderer = TestBed.get(Renderer2);
        window = TestBed.get("Window");
        directive = new DynamicHeightDirective(el, renderer, window);
      });
  }));

  it("should create an instance", () => {
    expect(directive).toBeTruthy();
  });
});
