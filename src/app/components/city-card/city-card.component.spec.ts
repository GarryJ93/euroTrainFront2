import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CityCardComponent } from './city-card.component';

describe('CityCardComponent', () => {
  let component: CityCardComponent;
  let fixture: ComponentFixture<CityCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CityCardComponent]
    });
    fixture = TestBed.createComponent(CityCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
