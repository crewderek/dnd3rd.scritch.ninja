import { TestBed } from '@angular/core/testing';

import { SkinHelperService } from './skin-helper.service';

describe('SkinHelperService', () => {
  let service: SkinHelperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SkinHelperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
