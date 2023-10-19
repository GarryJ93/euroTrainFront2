import { TestBed } from '@angular/core/testing';

import { StayCatService } from './stay-cat.service';

describe('StayCatService', () => {
  let service: StayCatService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StayCatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
