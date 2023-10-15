import { Component, Input } from '@angular/core';
import { Itinerary } from 'src/app/models/itinerary';
import { ItineraryService } from 'src/app/services/itinerary.service';

@Component({
  selector: 'app-card-example',
  templateUrl: './card-example.component.html',
  styleUrls: ['./card-example.component.css']
})
export class CardExampleComponent {
  @Input() example!: Itinerary[];
  @Input() myExample!: Itinerary;


  constructor(private itineraryService: ItineraryService) { }
  
}
