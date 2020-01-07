import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  MatListModule,
  MatIconModule,
  MatCardModule,
  MatBadgeModule,
  MatMenuModule,
  MatButtonModule
} from "@angular/material";

import { FooterComponent } from "./footer/footer.component";
import { HeaderComponent } from "./header/header.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { RouterModule } from "@angular/router";
import { PricetagModule } from '../shared/components/pricetag/pricetag.module';

const MATERIAL_COMPONENTS = [
  MatListModule,
  MatIconModule,
  MatCardModule,
  MatBadgeModule,
  MatMenuModule,
  MatButtonModule
];

@NgModule({
  declarations: [FooterComponent, HeaderComponent, NavbarComponent],
  imports: [CommonModule, RouterModule, ...MATERIAL_COMPONENTS, PricetagModule],
  exports: [FooterComponent, HeaderComponent, NavbarComponent]
})
export class CoreModule {}
