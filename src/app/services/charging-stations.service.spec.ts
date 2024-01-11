import { TestBed } from '@angular/core/testing';

import { ChargingStationsService } from './charging-stations.service';

describe('ChargingStationsService', () => {
  let service: ChargingStationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChargingStationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
