import { Component, OnInit, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "tabmo-shop-action-bar",
  templateUrl: "./shop-action-bar.component.html",
  styleUrls: ["./shop-action-bar.component.scss"]
})
export class ShopActionBarComponent implements OnInit {
  @Output() add: EventEmitter<void> = new EventEmitter();
  @Output() remove: EventEmitter<void> = new EventEmitter();

  quantity = 0;

  constructor() {}

  ngOnInit() {}
}
