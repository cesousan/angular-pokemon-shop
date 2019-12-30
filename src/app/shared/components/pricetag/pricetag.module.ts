import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material';

import { PricetagComponent } from './pricetag.component';



@NgModule({
  declarations: [PricetagComponent],
  imports: [
    CommonModule,
    MatIconModule
  ],
  exports: [PricetagComponent],
})
export class PricetagModule { }
