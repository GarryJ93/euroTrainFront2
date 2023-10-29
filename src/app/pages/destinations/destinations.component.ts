import { Component, OnInit } from '@angular/core';
import { City } from 'src/app/models/city';
import { CityService } from 'src/app/services/city.service';

@Component({
  selector: 'app-destinations',
  templateUrl: './destinations.component.html',
  styleUrls: ['./destinations.component.css']
})
export class DestinationsComponent implements OnInit {
  allCities!: City[];
  citiesToDisplay!: City[];
  userInput!: string;
  sortedCities!: City[];
constructor(private cityService: CityService) {}

  ngOnInit() {
    this.cityService.getAllCities().subscribe({
      next: (response) => {
        this.allCities = [...response];
        this.citiesToDisplay = [...response];
        this.sortedCities = [...this.citiesToDisplay].sort((a, b) =>
          a.name.localeCompare(b.name)
        );
      }
      })
  }

  onSearch(searchInput: string) {
    this.userInput = searchInput;
    this.sortedCities = [...this.allCities].sort((a, b) =>
      a.name.localeCompare(b.name)
    );;
    if (this.userInput) {
      this.sortedCities= [...this.sortedCities.filter((city) =>
        city.name.toLowerCase().includes(this.userInput.toLowerCase())
      )];
      
    }
    
  }
}


