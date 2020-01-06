export interface RadarChartData {
  data: RadarChartDataValue[];
  axisDefinitions: { key: string; displayValue: string }[];
}

export interface RadarChartDataValue {
  axis: string;
  value: number;
}
