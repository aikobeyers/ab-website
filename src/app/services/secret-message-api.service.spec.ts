import { TestBed } from '@angular/core/testing';

import { SecretMessageApiService } from './secret-message-api.service';

describe('SecretMessageApiService', () => {
  let service: SecretMessageApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SecretMessageApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
