import {
  Component,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  Input
} from "@angular/core";

@Component({
  selector: "tabmo-shop-action-bar",
  templateUrl: "./shop-action-bar.component.html",
  styleUrls: ["./shop-action-bar.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShopActionBarComponent {
  @Input()
  quantity = 0;

  @Output() add: EventEmitter<void> = new EventEmitter();
  @Output() remove: EventEmitter<void> = new EventEmitter();

  onAdd() {
    this.add.emit();
  }
  onRemove() {
    this.remove.emit();
  }
}
