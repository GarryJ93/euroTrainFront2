import { Component, EventEmitter, Input, Output } from '@angular/core';
import { City } from 'src/app/models/city';

@Component({
  selector: 'app-destination-list',
  templateUrl: './destination-list.component.html',
  styleUrls: ['./destination-list.component.css'],
})
export class DestinationListComponent {
  @Input() citiesList!: City[];
  @Output() userInput = new EventEmitter<string>();

  onEnterSearch(resultUserSearch: string) {
    console.log(resultUserSearch);

    this.userInput.emit(resultUserSearch);
  }
}
