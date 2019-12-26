import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatListModule, MatIconModule } from "@angular/material";

import { FooterComponent } from "./footer/footer.component";
import { HeaderComponent } from "./header/header.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { RouterModule } from "@angular/router";

const MATERIAL_COMPONENTS = [MatListModule, MatIconModule];

@NgModule({
  declarations: [FooterComponent, HeaderComponent, NavbarComponent],
  imports: [CommonModule, RouterModule, ...MATERIAL_COMPONENTS],
  exports: [FooterComponent, HeaderComponent, NavbarComponent]
})
export class CoreModule {}
