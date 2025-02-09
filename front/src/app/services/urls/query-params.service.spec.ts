import { TestBed } from '@angular/core/testing';

import { QueryParamsService } from './query-params.service';

describe('ListFilterService', () => {
  let service: QueryParamsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QueryParamsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
