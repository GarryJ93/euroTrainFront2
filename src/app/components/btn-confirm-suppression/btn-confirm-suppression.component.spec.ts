import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnConfirmSuppressionComponent } from './btn-confirm-suppression.component';

describe('BtnConfirmSuppressionComponent', () => {
  let component: BtnConfirmSuppressionComponent;
  let fixture: ComponentFixture<BtnConfirmSuppressionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BtnConfirmSuppressionComponent]
    });
    fixture = TestBed.createComponent(BtnConfirmSuppressionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
