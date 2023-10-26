import { Component, OnInit } from '@angular/core';
import { Country } from 'src/app/models/country';
import { CountryService } from 'src/app/services/country.service';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css'],
})
export class CountryComponent implements OnInit {
  allCountries!: Country[];
  countryToDisplay!: Country[];
  sortedCountries!: Country[];
  userInput!: string;
  constructor(private countryService: CountryService) {}

  ngOnInit() {
    this.countryService.getAllCountries().subscribe({
      next: (response) => {
        {
          this.allCountries = [...response];
          this.countryToDisplay = [...response];
          this.sortedCountries = this.countryToDisplay.sort((a, b) =>
            a.name.localeCompare(b.name)
          );
        }
      },
    });
  }

  onSearch(searchInput: string) {
    this.userInput = searchInput;
    this.sortedCountries = [...this.allCountries].sort((a, b) =>
      a.name.localeCompare(b.name)
    );;
    if (this.userInput) {
      this.sortedCountries = this.sortedCountries.filter((country) =>
        country.name.toLowerCase().includes(this.userInput.toLowerCase())
      );
    }
    
  }
}

