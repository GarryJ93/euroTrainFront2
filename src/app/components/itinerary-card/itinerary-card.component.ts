import { Component, Input } from '@angular/core';
import { Itinerary } from 'src/app/models/itinerary';

@Component({
  selector: 'app-itinerary-card',
  templateUrl: './itinerary-card.component.html',
  styleUrls: ['./itinerary-card.component.css']
})
export class ItineraryCardComponent {
  @Input() itineraries!: Itinerary;

  ngOnInit() {
    console.log(this.itineraries)
  }
}
