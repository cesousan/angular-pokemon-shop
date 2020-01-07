import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";

import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  MatCardModule,
  MatDividerModule,
  MatSlideToggleModule,
  MatButtonModule,
  MatIconModule
} from "@angular/material";
import { Routes, RouterModule } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";

import { ShopActionBarModule } from "src/app/shared/components/shop-action-bar/shop-action-bar.module";
import { PricetagModule } from "src/app/shared/components/pricetag/pricetag.module";
import { SearchInputModule } from "src/app/shared/components/search-input/search-input.module";
import { InfiniteScrollModule } from "src/app/shared/components/infinite-scroll/infinite-scroll.module";
import { ChartModule } from "src/app/shared/components/chart/chart.module";
import { DynamicHeightDirectiveModule } from "src/app/shared/directives/dynamicHeight/dynamic-height-directive.module";
import { PokemonsComponent, PokemonDetailComponent } from "./containers";

import * as fromState from "./+state";
import * as fromServices from "./services";
import * as fromComponents from "./components";
import * as fromContainers from "./containers";
import * as fromGuards from "./guards";

const MATERIAL_COMPONENTS = [
  MatCardModule,
  MatDividerModule,
  MatSlideToggleModule,
  MatButtonModule,
  MatIconModule
];
const CUSTOM_COMPONENTS = [
  ShopActionBarModule,
  PricetagModule,
  SearchInputModule,
  InfiniteScrollModule,
  ChartModule
];
const CUSTOM_DIRECTIVES = [DynamicHeightDirectiveModule];

export const routes: Routes = [
  {
    path: "",
    component: PokemonsComponent,
    canActivate: [fromGuards.PokemonsGuard]
  },
  {
    path: ":name",
    component: PokemonDetailComponent,
    canActivate: [fromGuards.PokemonDetailGuard]
  }
];

@NgModule({
  declarations: [...fromComponents.components, ...fromContainers.containers],
  imports: [
    CommonModule,
    ReactiveFormsModule,

    ...MATERIAL_COMPONENTS,
    ...CUSTOM_COMPONENTS,
    ...CUSTOM_DIRECTIVES,

    StoreModule.forFeature(fromState.POKESHOP_FEATURE_KEY, fromState.reducers),
    EffectsModule.forFeature(fromState.effects),
    RouterModule.forChild(routes)
  ],
  providers: [...fromServices.services, ...fromGuards.guards]
})
export class PokeShopModule {}
