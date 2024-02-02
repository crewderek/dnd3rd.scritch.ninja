import { TestBed } from '@angular/core/testing';

import { EyeHelperService } from './eye-helper.service';

describe('EyeHelperService', () => {
  let service: EyeHelperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EyeHelperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
