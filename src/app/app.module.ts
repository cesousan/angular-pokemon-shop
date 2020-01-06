import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { CoreModule } from "./core/core.module";
import { RootStateModule } from "./+state/root-state.module";
import { HomeModule } from "./features/home/home.module";
import { PipesModule } from "./shared/pipes/pipes.module";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    RootStateModule,
    CoreModule,
    PipesModule,
    HomeModule
  ],
  providers: [
    {provide: "Window", useValue: window } // TODO: FIXME make it non-browser resilient.
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
