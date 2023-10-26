import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminItineraryCardComponent } from './admin-itinerary-card.component';

describe('AdminItineraryCardComponent', () => {
  let component: AdminItineraryCardComponent;
  let fixture: ComponentFixture<AdminItineraryCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminItineraryCardComponent]
    });
    fixture = TestBed.createComponent(AdminItineraryCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
