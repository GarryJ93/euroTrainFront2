import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MessageService } from 'primeng/api';
import { City } from 'src/app/models/city';
import { Country } from 'src/app/models/country';
import { StayCat } from 'src/app/models/stay-cat';
import { CityService } from 'src/app/services/city.service';
import { StayCatService } from 'src/app/services/stay-cat.service';

@Component({
  selector: 'app-add-city',
  templateUrl: './add-city.component.html',
  styleUrls: ['./add-city.component.css'],
})
export class AddCityComponent {
  visible: boolean = false;
  addCity!: FormGroup;
  @Input() countries!: Country[];
  allCategories!: StayCat[];
  categoriesToDisplay!: StayCat[];
  @Output() countryId = new EventEmitter<number>();

  constructor(
    private fb: FormBuilder,
    private cityService: CityService,
    private stayCatService: StayCatService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.initialForm();

    this.stayCatService.getAllStayCats().subscribe({
      next: (response) => {
        this.allCategories = [...response];
        this.categoriesToDisplay = [...response];
      },
    });
  }
  private initialForm() {
    this.addCity = this.fb.group({
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      country: new FormControl(''),
      cat: new FormControl(''),
    });
  }
  showDialog() {
    this.visible = true;
  }

  closeDialog() {
    this.visible = false;
  }

  onAddCity() {
    let newCity: City = {
      ...this.addCity.value,
    };

    newCity.id_country = +newCity.country;
    newCity.id_stay_cat = +newCity.cat;

    console.log(newCity);

    console.log(this.addCity);
    if (!this.addCity.valid) {
      newCity = {
        ...this.addCity.value,
      };
    }
    this.cityService.addCity(newCity).subscribe({
      next: () => {
        this.cityService.getAllCities().subscribe({
          next: (response) => {
            this.cityService.cityList$.next(response);
          },
        });
        this.messageService.add({
          severity: 'success',
          summary: 'Opération réussie',
          detail: 'Ville ajoutée avec succès',
        });
        this.countryId.emit(newCity.id_country);
        this.addCity.reset();
        this.closeDialog();
      },
      error: (error) => {
        console.error("Erreur lors de l'ajout du Ville", error);
      },
    });
  }
}
