import { TestBed } from '@angular/core/testing';

import { EnvironmentSetupService } from './environment-setup.service';

describe('EnvironmentSetupService', () => {
  let service: EnvironmentSetupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EnvironmentSetupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
