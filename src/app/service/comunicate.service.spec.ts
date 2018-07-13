import { TestBed, inject } from '@angular/core/testing';

import { ComunicateService } from './comunicate.service';

describe('ComunicateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ComunicateService]
    });
  });

  it('should be created', inject([ComunicateService], (service: ComunicateService) => {
    expect(service).toBeTruthy();
  }));
});
