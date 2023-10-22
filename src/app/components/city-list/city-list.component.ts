import { Component, Inject, Input, OnChanges } from '@angular/core';
import { City } from 'src/app/models/city';
import { CityService } from 'src/app/services/city.service';
import { PhotoService } from 'src/app/services/photo.service';
import { MessageService } from 'primeng/api';
import { Country } from 'src/app/models/country';
@Component({
  selector: 'app-city-list',
  templateUrl: './city-list.component.html',
  styleUrls: ['./city-list.component.css'],
})
export class CityListComponent {
  @Input() cityList!: City[];
  @Input() countriesToDisplay!: Country[];
  city!: City;
  idCityForPicture!: number;
  idCountryForPicture!: number;
  cityBlob!: Blob;
  cityPicture!: any;
  visible: boolean = false;

  constructor(
    private cityService: CityService,
    private photoService: PhotoService,
    private messageService: MessageService
  ) {}

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
    console.log('fermeture', city);
  }
}
