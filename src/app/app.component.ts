import { Store, select } from '@ngrx/store';
import { of, Observable } from "rxjs";

import { Component } from "@angular/core";

import { NavItem } from 'src/app/core/model';
import * as fromRootState from 'src/app/+state';

@Component({
  selector: "tabmo-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  public title = "tabmo pokemon app";
  public menuList$: Observable<NavItem[]> = of([
    { path: "home", icon: "home", text: "Home" },
    { path: "pokemons", icon: "pets", text: "Pokemons" },
  ]);
  public basketCount$: Observable<number> = this.store.pipe(select(fromRootState.selectBasketCount));


  constructor(private store: Store<fromRootState.State>) {}
}
