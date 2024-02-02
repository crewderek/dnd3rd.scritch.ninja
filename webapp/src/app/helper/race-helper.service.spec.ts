import { TestBed } from '@angular/core/testing';

import { RaceHelperService } from './race-helper.service';

describe('RaceHelperService', () => {
  let service: RaceHelperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RaceHelperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
