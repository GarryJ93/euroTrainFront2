import { TestBed } from '@angular/core/testing';

import { TravelDocumentService } from './travel-document.service';

describe('TravelDocumentService', () => {
  let service: TravelDocumentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TravelDocumentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
