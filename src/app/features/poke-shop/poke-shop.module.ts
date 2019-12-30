import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";

import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatCardModule, MatDividerModule } from "@angular/material";

import { ShopActionBarModule } from "src/app/shared/components/shop-action-bar/shop-action-bar.module";
import { PricetagModule } from "src/app/shared/components/pricetag/pricetag.module";
import { SearchInputModule } from "src/app/shared/components/search-input/search-input.module";
import { PokeShopRoutingModule } from "./poke-shop-routing.module";

import * as fromState from "./+state";
import * as fromServices from "./services";
import * as fromComponents from "./components";
import * as fromContainers from "./containers";
import { ReactiveFormsModule } from '@angular/forms';

const MATERIAL_COMPONENTS = [MatCardModule, MatDividerModule];
const CUSTOM_COMPONENTS = [
  ShopActionBarModule,
  PricetagModule,
  SearchInputModule
];

@NgModule({
  declarations: [...fromComponents.components, ...fromContainers.containers],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ...MATERIAL_COMPONENTS,
    ...CUSTOM_COMPONENTS,
    StoreModule.forFeature(fromState.POKESHOP_FEATURE_KEY, fromState.reducers),
    EffectsModule.forFeature(fromState.effects),
    PokeShopRoutingModule
  ],
  providers: [...fromServices.services]
})
export class PokeShopModule {}
