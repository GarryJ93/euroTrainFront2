import { Component, OnInit } from '@angular/core';
import { Itinerary } from 'src/app/models/itinerary';
import { TransportCompany } from 'src/app/models/transport-company';
import { CompanyService } from 'src/app/services/company.service';
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
  allCompanies!: TransportCompany[];
  companiesToDisplay!: TransportCompany[];

  constructor(
    private itineraryService: ItineraryService,
    private companyService: CompanyService
  ) {}

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

    this.companyService.getAllCompanies().subscribe({
      next: (response) => {
        this.allCompanies = [...response];
        this.companiesToDisplay = [...response];
      },
    });
  }
}
