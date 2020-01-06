import { Injectable } from "@angular/core";
import * as d3 from "d3";
import { RadarChartData } from "./radar-chart.model";

@Injectable({
  providedIn: "root"
})
export class RadarChartService {
  private host;
  private svg;
  private config;
  private axisProperties;
  private axisLabels;
  private totalAxes;
  private radius;
  private colorScale;
  private axes;
  private levels;
  // private companies;

  constructor() {}

  setup(htmlElement: HTMLElement) {}

  populate(data: RadarChartData) {}
}

function getAxisFromData(data: RadarChartData) {
  const { axisDefinitions, data: collection } = data;
  // filter incorrect data
  const defKeys = axisDefinitions.map(def => def.key);
  const filteredData = collection.filter(
    el => !!el && !!el.axis && defKeys.includes(el.axis)
  );
}
