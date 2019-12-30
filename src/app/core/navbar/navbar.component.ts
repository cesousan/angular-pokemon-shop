import { Component, ChangeDetectionStrategy, Input } from "@angular/core";

import { NavItem } from '../model';

@Component({
  selector: "tabmo-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent {
  @Input() navList: NavItem[];
  @Input() basketCount: number;
}
