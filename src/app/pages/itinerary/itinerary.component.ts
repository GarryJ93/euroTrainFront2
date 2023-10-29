import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Itinerary } from 'src/app/models/itinerary';
import { StayCat } from 'src/app/models/stay-cat';
import { ItineraryService } from 'src/app/services/itinerary.service';
import { StayCatService } from 'src/app/services/stay-cat.service';

@Component({
  selector: 'app-itinerary',
  templateUrl: './itinerary.component.html',
  styleUrls: ['./itinerary.component.css'],
})
export class ItineraryComponent implements OnInit {
  allItineraries!: Itinerary[];
  itinerariesToDisplay!: Itinerary[];
  allCategories!: StayCat[];
  categoriesToDisplay!: StayCat[];
  exampleOfWay!: Itinerary;
  searchItinerary!: FormGroup;
  departure!: string;
  arrival!: string;
  filtered: Boolean = false;
  categoriesChecked!: number[];

  constructor(
    private itineraryService: ItineraryService,
    private categoryService: StayCatService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.initialForm();

    this.itineraryService.getAllItineraries().subscribe({
      next: (response) => {
        {
          this.allItineraries = [...response];
          this.itinerariesToDisplay = [...response];
        }
      },
    });

    this.categoryService.getAllStayCats().subscribe({
      next: (response) => {
        this.allCategories = [...response];
        this.categoriesToDisplay = [...response];
      },
    });
  }

  initialForm() {
    this.searchItinerary = this.fb.group({
      departure: new FormControl('', Validators.required),
      arrival: new FormControl('', Validators.required),
    });
  }

  onSearchItinerary() {
    this.itinerariesToDisplay = [...this.allItineraries];
    this.filtered = true;
    this.onUserInteractionFiltre();
  }
  onUserInteractionFiltre() {
    this.itinerariesToDisplay = [...this.allItineraries];
    this.filtered = true;
    if (this.searchItinerary.valid) {
      this.arrival = this.searchItinerary.value.arrival;
      this.departure = this.searchItinerary.value.departure;

      this.itinerariesToDisplay = this.itinerariesToDisplay.filter((way) => {
        const originCityName = this.normalizeString(
          way.originCity.name
        ).toLowerCase();
        const destinationCityName = this.normalizeString(
          way.destinationCity.name
        ).toLowerCase();
        const inputOrigin = this.normalizeString(this.departure).toLowerCase();
        const inputDestination = this.normalizeString(
          this.arrival
        ).toLowerCase();

        const isOriginMatch = originCityName.includes(inputOrigin);
        const isDestinationMatch =
          destinationCityName.includes(inputDestination);

        return isOriginMatch && isDestinationMatch;
      });
    }
    if (this.categoriesChecked && this.categoriesChecked.length > 0) {
      this.itinerariesToDisplay = this.itinerariesToDisplay.filter((way) =>
        this.categoriesChecked.includes(way.destinationCity.id_stay_cat)
      );
    }
  }

  reinitialize() {
    this.itinerariesToDisplay = [...this.allItineraries];
    this.filtered = false;
    this.searchItinerary.reset();
  }

  normalizeString(str: string): string {
    const normalizedString = str
      .normalize('NFD')
      .replace(/[\u0300-\u0309\u036f]/g, '')
      .toLowerCase();

    // Remplacez le "o" normal par "ø" dans la chaîne normalisée
    const oWithSlash = 'ø';
    const oNormal = 'o';
    return normalizedString.replace(new RegExp(oNormal, 'g'), oWithSlash);
  }

  swapValues() {
    const currentArrival = this.searchItinerary.get('arrival')!.value;
    const currentDeparture = this.searchItinerary.get('departure')!.value;

    this.searchItinerary.get('arrival')!.setValue(currentDeparture);
    this.searchItinerary.get('departure')!.setValue(currentArrival);
  }

  onCheckedCategories(categoriesTab: number[]) {
    this.categoriesChecked = categoriesTab;
    console.log(this.categoriesChecked);
  

    this.onUserInteractionFiltre();
  }
}

