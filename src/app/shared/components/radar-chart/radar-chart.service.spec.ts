import { TestBed } from '@angular/core/testing';

import { RadarChartService } from './radar-chart.service';

describe('RadarChartService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RadarChartService = TestBed.get(RadarChartService);
    expect(service).toBeTruthy();
  });
});
