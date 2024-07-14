import { TestBed } from '@angular/core/testing';

import { LocaStoreService } from './loca-store.service';

describe('LocaStoreService', () => {
  let service: LocaStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocaStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
