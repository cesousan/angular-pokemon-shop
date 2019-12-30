import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule, MatInputModule } from '@angular/material';

import { SearchInputComponent } from './search-input.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [SearchInputComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule
  ],
  exports: [SearchInputComponent]
})
export class SearchInputModule { }
