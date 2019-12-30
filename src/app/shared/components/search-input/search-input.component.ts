import { Component, forwardRef, ChangeDetectionStrategy, Input } from '@angular/core';
import { FormControl, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'tabmo-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SearchInputComponent),
      multi: true
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchInputComponent implements ControlValueAccessor {

  @Input() placeholder = "Search...";

  public search = new FormControl('');

  onChange = (val: any) => {};

  onTouched = () => {};

  writeValue(val: any): void {
    val && this.search.setValue(val, { emitEvent: false });
  }
  registerOnChange(fn: any): void {
    this.search.valueChanges.subscribe(fn);
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    isDisabled ? this.search.disable() : this.search.enable();
  }

}
