import { TestBed } from '@angular/core/testing';

import { HairHelperService } from './hair-helper.service';

describe('HairHelperService', () => {
  let service: HairHelperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HairHelperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
