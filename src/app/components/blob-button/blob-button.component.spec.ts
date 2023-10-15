import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlobButtonComponent } from './blob-button.component';

describe('BlobButtonComponent', () => {
  let component: BlobButtonComponent;
  let fixture: ComponentFixture<BlobButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BlobButtonComponent]
    });
    fixture = TestBed.createComponent(BlobButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
