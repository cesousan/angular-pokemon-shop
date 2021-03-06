import {
  Component,
  OnInit,
  OnDestroy,
  ElementRef,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  AfterViewInit,
  Inject
} from "@angular/core";

@Component({
  selector: "tabmo-infinite-scroll",
  template: `
    <ng-content></ng-content>
    <!-- the 'dot' is a trick to make sure the entry is intersecting -->
    <div #anchor>.</div>
  `,
  styleUrls: ["./infinite-scroll.component.scss"]
})
export class InfiniteScrollComponent
  implements OnInit, OnDestroy, AfterViewInit {
  @Input() options: any = {};
  @Output() scrolled: EventEmitter<void> = new EventEmitter();
  @ViewChild("anchor", { static: false }) anchor: ElementRef<HTMLElement>;

  public observer: IntersectionObserver;

  get element() {
    return this.host.nativeElement;
  }

  constructor(
    @Inject(ElementRef) private host: ElementRef,
    @Inject("Window") private window
  ) {}

  ngOnInit() {
    const options = {
      root: this.isHostScrollable() ? this.host.nativeElement : null,
      ...this.options
    };

    this.observer = new IntersectionObserver(([entry]) => {
      entry.isIntersecting && this.scrolled.emit();
    }, options);
  }

  ngAfterViewInit(): void {
    this.observer.observe(this.anchor.nativeElement);
  }

  ngOnDestroy() {
    this.observer.disconnect();
  }

  private isHostScrollable() {
    const style = this.window.getComputedStyle(this.element);
    return (
      style.getPropertyValue("overflow") === "auto" ||
      style.getPropertyValue("overflow-y") === "scroll"
    );
  }
}
