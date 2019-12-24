import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RootStateModule } from "./+state/root-state.module";

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, BrowserAnimationsModule, RootStateModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
