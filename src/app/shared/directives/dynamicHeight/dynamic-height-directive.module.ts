import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicHeightDirective } from './dynamic-height.directive';



@NgModule({
  declarations: [
    DynamicHeightDirective
  ],
  exports: [
    DynamicHeightDirective
  ],
  imports: [
    CommonModule
  ]
})
export class DynamicHeightDirectiveModule { }
