import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";

import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { environment } from "src/environments/environment";
import { reducers, metaReducers } from "./reducers";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true
      }
    }),
    EffectsModule.forRoot([]),
    !environment.production
      ? StoreDevtoolsModule.instrument({
          maxAge: 30
        })
      : []
  ]
})
export class RootStateModule {}
