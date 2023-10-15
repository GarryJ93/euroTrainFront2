import { Component, Input } from '@angular/core';
import { Itinerary } from '../../models/itinerary';

@Component({
  selector: 'app-itinerary-list',
  templateUrl: './itinerary-list.component.html',
  styleUrls: ['./itinerary-list.component.css']
})
export class ItineraryListComponent {
  @Input() itinerariesList!: Itinerary[];
  itineraryExample!: Itinerary;
  ngOnInit() {
    
  }
}
