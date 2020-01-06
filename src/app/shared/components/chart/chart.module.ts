import { ChartsModule } from 'ng2-charts';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartComponent } from './chart.component';



@NgModule({
  declarations: [
    ChartComponent
  ],
  imports: [
    CommonModule,
    ChartsModule
  ],
  exports: [
    ChartComponent
  ]
})
export class ChartModule { }
