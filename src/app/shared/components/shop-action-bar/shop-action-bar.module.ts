import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatButtonModule } from "@angular/material";

import { ShopActionBarComponent } from "./shop-action-bar.component";

@NgModule({
  declarations: [ShopActionBarComponent],
  imports: [CommonModule, MatButtonModule],
  exports: [ShopActionBarComponent]
})
export class ShopActionBarModule {}
