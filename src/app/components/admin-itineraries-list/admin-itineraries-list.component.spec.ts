import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminItinerariesListComponent } from './admin-itineraries-list.component';

describe('AdminItinerariesListComponent', () => {
  let component: AdminItinerariesListComponent;
  let fixture: ComponentFixture<AdminItinerariesListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminItinerariesListComponent]
    });
    fixture = TestBed.createComponent(AdminItinerariesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
