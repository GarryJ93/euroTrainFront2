import { Component, OnInit } from '@angular/core';
import { Itinerary } from 'src/app/models/itinerary';
import { ItineraryService } from 'src/app/services/itinerary.service';

@Component({
  selector: 'app-itinerary',
  templateUrl: './itinerary.component.html',
  styleUrls: ['./itinerary.component.css']
})
export class ItineraryComponent implements OnInit{
allItineraries!: Itinerary[];
  itinerariesToDisplay!: Itinerary[];
  exampleOfWay!: Itinerary;

  constructor(private itineraryService: ItineraryService) { }
  
  ngOnInit() {
    this.itineraryService.getAllItineraries().subscribe({
      next: (response) => {
        {
          this.allItineraries = [...response];
          this.itinerariesToDisplay = [...response];
          this.exampleOfWay = this.itinerariesToDisplay[Math.floor(Math.random() * (response.length - 1))];

          console.log(this.itinerariesToDisplay);
          console.log(this.exampleOfWay)
        }
      },
    });
  }
}

