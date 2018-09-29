import { TestBed, inject } from '@angular/core/testing';

import { MyAppErrorHandlerService } from './my-app-error-handler.service';

describe('MyAppErrorHandlerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MyAppErrorHandlerService]
    });
  });

  it('should be created', inject([MyAppErrorHandlerService], (service: MyAppErrorHandlerService) => {
    expect(service).toBeTruthy();
  }));
});
