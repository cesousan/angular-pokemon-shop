import { Observable } from "rxjs";
import { filter, tap } from "rxjs/operators";

import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Input,
  OnDestroy,
  AfterViewInit
} from "@angular/core";

import { RadarChartData } from "./radar-chart.model";
import { RadarChartService } from "./radar-chart.service";

@Component({
  selector: "tabmo-radar-chart",
  templateUrl: "./radar-chart.component.html",
  styleUrls: ["./radar-chart.component.scss"]
})
export class RadarChartComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input() data$: Observable<RadarChartData>;

  @ViewChild("container", { static: false }) el: ElementRef;

  private htmlElement: HTMLElement;

  constructor(private radar: RadarChartService) {}

  ngOnInit() {
    this.data$.pipe(
      filter(x => !!x),
      tap(data => this.radar.populate(data))
    );
  }

  ngAfterViewInit() {
    this.htmlElement = this.el.nativeElement;
    this.radar.setup(this.htmlElement);
  }

  ngOnDestroy() {}
}
