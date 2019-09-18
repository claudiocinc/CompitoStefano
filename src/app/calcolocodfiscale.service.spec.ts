import { TestBed } from '@angular/core/testing';

import { CalcolocodfiscaleService } from './calcolocodfiscale.service';

describe('CalcolocodfiscaleService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CalcolocodfiscaleService = TestBed.get(CalcolocodfiscaleService);
    expect(service).toBeTruthy();
  });
});
