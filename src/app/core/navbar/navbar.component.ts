import { Component, ChangeDetectionStrategy, Input } from "@angular/core";

@Component({
  selector: "tabmo-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent {
  @Input() navList: NavItem[];
}

export interface NavItem {
  path: string;
  icon?: string;
  text?: string;
}
