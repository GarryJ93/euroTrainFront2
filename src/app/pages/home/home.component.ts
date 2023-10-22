import { Component, OnInit } from '@angular/core';
import { Itinerary } from 'src/app/models/itinerary';
import { ItineraryService } from 'src/app/services/itinerary.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
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
          this.exampleOfWay =
            this.itinerariesToDisplay[
              Math.floor(Math.random() * (this.itinerariesToDisplay.length - 1))
            ];

          console.log(this.itinerariesToDisplay);
          console.log(this.exampleOfWay.destinationCity);
        }
      },
    });
  }

  
}
