import { TestBed } from '@angular/core/testing';

import { GenderHelperService } from './gender-helper.service';

describe('GenderHelperService', () => {
  let service: GenderHelperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GenderHelperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
