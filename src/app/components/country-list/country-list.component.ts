import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Country } from 'src/app/models/country';

@Component({
  selector: 'app-country-list',
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.css'],
})
export class CountryListComponent {
  @Input() sortedCountries!: Country[];
  @Output() userInput = new EventEmitter<string>();

  onEnterSearch(resultUserSearch: string) {
    console.log(resultUserSearch);

    this.userInput.emit(resultUserSearch);
  }
}
