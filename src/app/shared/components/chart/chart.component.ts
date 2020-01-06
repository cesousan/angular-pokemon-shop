import { Observable } from "rxjs";
import { filter, map } from "rxjs/operators";

import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from "@angular/core";

import { ChartDataConfig, ChartType } from "./chart.model";

@Component({
  selector: "tabmo-chart",
  templateUrl: "./chart.component.html",
  styleUrls: ["./chart.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChartComponent implements OnInit {
  @Input() chartConfig$: Observable<Partial<ChartDataConfig>>;

  @Output() chartHover = new EventEmitter();
  @Output() chartClick = new EventEmitter();

  public input$: Observable<ChartDataInputs>

  ngOnInit() {
    this.input$ = this.chartConfig$.pipe(
      filter(x => !!x),
      map(formatData)
    );
  }

  chartHovered(event: any) {
    this.chartHover.emit(event);
  }

  chartClicked(event: any) {
    this.chartClick.emit(event);
  }
}



const formatData = (chartDataConfig: ChartDataConfig = {} as ChartDataConfig): ChartDataInputs => {
  const {
    data: _data = [],
    header: label = null,
    type: chartType = 'radar',
    showLegend: legend = false,
    size = { h:600, w: 600 }
  } = chartDataConfig;
  const filteredData = _data.filter(el => !!el && !!el.axis);
  const labels: string[] = filteredData.map(el => el.axis);
  const data: number[] = filteredData.map(el => el.value);
  return {
    datasets: [{ data, label }],
    chartType,
    labels,
    legend,
    size
  };
}

interface ChartDataInputs {
  datasets: { data: number[], label: string }[],
  labels: string[],
  chartType: ChartType,
  legend: boolean;
  size: {h: number; w: number;}
}