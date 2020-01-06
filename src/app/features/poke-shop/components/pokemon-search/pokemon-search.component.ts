import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

import {
  Component,
  ChangeDetectionStrategy,
  EventEmitter,
  Output
} from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";

@Component({
  selector: "tabmo-pokemon-search",
  templateUrl: "./pokemon-search.component.html",
  styleUrls: ["./pokemon-search.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PokemonSearchComponent {
  @Output()
  public onSearch: EventEmitter<string> = new EventEmitter();
  @Output()
  public onSelectedFiltered: EventEmitter<boolean> = new EventEmitter();

  private destroy: Subject<void> = new Subject();

  public searchForm = new FormGroup({
    searchTerm: new FormControl(""),
    filters: new FormGroup({
      selected: new FormControl(false)
    })
  });

  get searchTerm() {
    return this.searchForm.get("searchTerm");
  }

  get selectedFiltered() {
    return this.searchForm.get("filters.selected");
  }

  ngOnInit() {
    this.searchTerm.valueChanges
      .pipe(takeUntil(this.destroy.asObservable()))
      .subscribe(search => this.onSearch.emit(search));

    this.selectedFiltered.valueChanges
      .pipe(takeUntil(this.destroy.asObservable()))
      .subscribe(selected => this.onSelectedFiltered.emit(selected));
  }

  ngOnDestroy() {
    this.destroy.next();
  }
}
