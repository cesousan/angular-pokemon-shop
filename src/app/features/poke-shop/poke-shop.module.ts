import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";

import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatCardModule } from "@angular/material";

import { PokeShopRoutingModule } from "./poke-shop-routing.module";

import * as fromState from "./+state";
import * as fromServices from "./services";
import * as fromComponents from "./components";
import * as fromContainers from "./containers";
import { ShopActionBarModule } from "src/app/shared/components/shop-action-bar/shop-action-bar.module";

const MATERIAL_COMPONENTS = [MatCardModule];
const CUSTOM_COMPONENTS = [ShopActionBarModule];

@NgModule({
  declarations: [...fromComponents.components, ...fromContainers.containers],
  imports: [
    CommonModule,
    ...MATERIAL_COMPONENTS,
    ...CUSTOM_COMPONENTS,
    StoreModule.forFeature(fromState.POKESHOP_FEATURE_KEY, fromState.reducers),
    EffectsModule.forFeature(fromState.effects),
    PokeShopRoutingModule
  ],
  providers: [...fromServices.services]
})
export class PokeShopModule {}
