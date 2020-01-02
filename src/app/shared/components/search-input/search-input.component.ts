import { Subject } from "rxjs";
import { debounceTime, distinctUntilChanged, takeUntil } from "rxjs/operators";

import {
  Component,
  forwardRef,
  ChangeDetectionStrategy,
  Input,
  OnDestroy
} from "@angular/core";
import {
  FormControl,
  ControlValueAccessor,
  NG_VALUE_ACCESSOR
} from "@angular/forms";

@Component({
  selector: "tabmo-search-input",
  templateUrl: "./search-input.component.html",
  styleUrls: ["./search-input.component.scss"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SearchInputComponent),
      multi: true
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchInputComponent implements ControlValueAccessor, OnDestroy {
  @Input() placeholder = "Search...";
  @Input() debounceSearchMs = 300;

  public search = new FormControl("");

  private destroy: Subject<void> = new Subject();

  onChange = (val: any) => {};

  onTouched = () => {};

  ngOnDestroy() {
    this.destroy.next();
  }

  writeValue(val: any): void {
    val && this.search.setValue(val, { emitEvent: false });
  }
  registerOnChange(fn: any): void {
    this.search.valueChanges
      .pipe(
        debounceTime(this.debounceSearchMs),
        distinctUntilChanged(),
        takeUntil(this.destroy.asObservable())
      )
      .subscribe(fn);
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    isDisabled ? this.search.disable() : this.search.enable();
  }
}
