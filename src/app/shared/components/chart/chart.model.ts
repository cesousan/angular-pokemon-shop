export interface ChartDataConfig {
  data: ChartDataValue[];
  header: string;
  type: ChartType;
  showLegend: boolean;
  size: {h: number; w: number;}
}

export interface ChartDataValue {
  axis: string;
  value: number;
}

export type ChartType =
  | "line"
  | "bar"
  | "horizontalBar"
  | "radar"
  | "doughnut"
  | "polarArea"
  | "bubble"
  | "pie"
  | "scatter";
