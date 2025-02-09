import { TestBed } from '@angular/core/testing';

import { ApiEstablishmentService } from './api-establishment.service';

describe('ApiProjectService', () => {
  let service: ApiEstablishmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiEstablishmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
