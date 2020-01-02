import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";

import { HighlightPipe } from "./highlight.pipe";

@NgModule({
  declarations: [HighlightPipe],
  imports: [CommonModule, BrowserModule],
  exports: [HighlightPipe]
})
export class PipesModule {}
