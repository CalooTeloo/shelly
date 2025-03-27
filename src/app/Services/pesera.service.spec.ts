import { TestBed } from '@angular/core/testing';

import { PeseraService } from './pesera.service';

describe('PeseraService', () => {
  let service: PeseraService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PeseraService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
