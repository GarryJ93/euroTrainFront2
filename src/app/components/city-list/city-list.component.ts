import { Component, Inject, Input, OnChanges, ViewChild } from '@angular/core';
import { City } from 'src/app/models/city';
import { CityService } from 'src/app/services/city.service';
import { PhotoService } from 'src/app/services/photo.service';
import { MessageService } from 'primeng/api';
import { Country } from 'src/app/models/country';
import { Table } from 'primeng/table';
import { StayCatService } from 'src/app/services/stay-cat.service';
import { StayCat } from 'src/app/models/stay-cat';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-city-list',
  templateUrl: './city-list.component.html',
  styleUrls: ['./city-list.component.css'],
})
export class CityListComponent implements OnChanges {
  @Input() cityList!: City[];
  @Input() countriesToDisplay!: Country[];
  city!: City;
  idCityForPicture!: number | null;
  idCountryForPicture!: number;
  cityBlob!: Blob;
  cityPicture!: any;
  visible: boolean = false;
  searchValue: string = '';
  @ViewChild('dt') dt!: Table;
  allCategory!: StayCat[];
  categoryList!: StayCat[];
  select!: FormGroup;
  isEditing: boolean = false;
  

  constructor(
    private cityService: CityService,
    private categoryService: StayCatService,
    private messageService: MessageService,
    private fb: FormBuilder
  ) {}

  ngOnChanges() {
    this.categoryService.getAllStayCats().subscribe({
      next: (response) => {
        {
          this.allCategory = [...response];
          this.categoryList = [...response];
        }
      },
    });

    this.initialForm();
  }
  
  getCityId(id: number) {
    this.idCityForPicture = +id;
    this.cityService.getCityById(this.idCityForPicture).subscribe({
      next: (response) => {
        this.city = response;
        this.idCountryForPicture = this.city.id_country;
        console.log(this.city);
      },
    });
  }

  private initialForm() {
    this.select = this.fb.group({
      category: ['', Validators.required],
    });
  }
  showMessage() {
    this.messageService.add({
      severity: 'warn',
      summary: 'Supprimé',
      detail: 'Donnée supprimée !',
    });
  }

  showModalGalleria(city: City) {
    this.idCityForPicture = city.id!;
    city.isVisible = true;

    console.log(city);
  }

  closeModalGalleria(city: City) {
    city.isVisible = false;
    this.idCityForPicture = null;
    console.log('fermeture', city);
  }

  handleInputChange(event: Event) {
    this.dt.filter(this.searchValue, 'name', 'contains');
  }

  onSubmit(idCity: number) {
    console.log(idCity);
    const updateCity = {
      id_stay_cat: this.select.value.category,
    };
    console.log(updateCity);

    this.cityService.updateCity(idCity, updateCity).subscribe({
      next: (response) => {
        console.log('Catégorie mise à jour', response);
        this.messageService.add({
          severity: 'success',
          summary: 'Mise à jour',
          detail: 'Donnée mise à jour !',
        });
      },
      error: (error) => {
        console.error('Erreur lors de la mise à jour', error);
      },
    });
  }

  OnDeleteCity(idCity: number) {
    this.cityService.deleteCity(idCity).subscribe({
      next: (response) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Supprimé',
          detail: 'Ville supprimée !',
        });
        
      },
    });
  }

  onEditing() {
    this.isEditing = true;
  }

  
}
