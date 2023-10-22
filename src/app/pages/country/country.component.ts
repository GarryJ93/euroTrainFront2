import { Component, OnInit } from '@angular/core';
import { Country } from 'src/app/models/country';
import { CountryService } from 'src/app/services/country.service';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css']
})
export class CountryComponent implements OnInit{
allCountries!: Country[];
countryToDisplay!: Country[];


  constructor(private countryService: CountryService) { }

  ngOnInit() {
    this.countryService.getAllCountries().subscribe({
      next: (response) => {
        {
          this.allCountries = [...response];
          this.countryToDisplay = [...response];
        }
      },
    });
  }

  
}

