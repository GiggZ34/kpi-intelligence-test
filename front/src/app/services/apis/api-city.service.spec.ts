import { TestBed } from '@angular/core/testing';

import { ApiCityService } from './api-city.service';

describe('ApiCityService', () => {
  let service: ApiCityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiCityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
