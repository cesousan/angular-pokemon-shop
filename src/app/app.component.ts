import { of, Observable } from "rxjs";

import { Component } from "@angular/core";
import { NavItem } from "./core/navbar/navbar.component";

@Component({
  selector: "tabmo-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  title = "tabmo pokemon app";

  menuList$: Observable<NavItem[]> = of([
    { path: "home", icon: "home", text: "Home" },
    { path: "pokemons", icon: "pets", text: "Pokemons" },
    { path: "orders", icon: "shopping_cart", text: "My Cart" }
  ]);
}
