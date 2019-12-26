import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";

import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { PokeShopRoutingModule } from "./poke-shop-routing.module";

import * as fromState from "./+state";
import * as fromServices from "./services";
import * as fromComponents from "./components";
import * as fromContainers from "./containers";

@NgModule({
  declarations: [...fromComponents.components, ...fromContainers.containers],
  imports: [
    CommonModule,
    StoreModule.forFeature(fromState.POKESHOP_FEATURE_KEY, fromState.reducers),
    EffectsModule.forFeature(fromState.effects),
    PokeShopRoutingModule
  ],
  providers: [...fromServices.services]
})
export class PokeShopModule {}
