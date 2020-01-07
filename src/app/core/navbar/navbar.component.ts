import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Component, ChangeDetectionStrategy, Input, Inject } from "@angular/core";

import * as fromAppStore from 'src/app/+state';

import { NavItem, BasketItem } from '../model';

@Component({
  selector: "tabmo-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent {
  @Input() navList: NavItem[];
  @Input() basketCount: number;

  public totalPurchase$: Observable<number> = this.store$.pipe(select(fromAppStore.selectBasketTotalPrice));
  public basketItems$: Observable<BasketItem[]> = this.store$.pipe(select(fromAppStore.selectBasketItems))

  constructor(@Inject(Store) private store$: Store<fromAppStore.State>) {}
}
