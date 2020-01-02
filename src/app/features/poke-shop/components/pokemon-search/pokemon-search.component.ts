import { Subject } from "rxjs";
import { takeUntil, debounceTime, distinctUntilChanged } from "rxjs/operators";

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

  private destroy: Subject<void> = new Subject();

  public searchForm = new FormGroup({
    searchTerm: new FormControl("")
  });

  get searchTerm() {
    return this.searchForm.get("searchTerm");
  }

  ngOnInit() {
    this.searchTerm.valueChanges
      .pipe(takeUntil(this.destroy.asObservable()))
      .subscribe(search => this.onSearch.emit(search));
  }

  ngOnDestroy() {
    this.destroy.next();
  }
}
