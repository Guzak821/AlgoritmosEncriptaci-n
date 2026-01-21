import { TestBed } from '@angular/core/testing';

import { CryptoApi } from './crypto-api';

describe('CryptoApi', () => {
  let service: CryptoApi;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CryptoApi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
