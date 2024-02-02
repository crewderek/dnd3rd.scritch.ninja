import { TestBed } from '@angular/core/testing';

import { APIHttpServiceService } from './apihttp-service.service';

describe('APIHttpServiceService', () => {
  let service: APIHttpServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(APIHttpServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
