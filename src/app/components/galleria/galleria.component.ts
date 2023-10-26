import { Component, Input, OnChanges } from '@angular/core';
import { MessageService } from 'primeng/api';
import { City } from 'src/app/models/city';
import { CityService } from 'src/app/services/city.service';
import { PhotoService } from 'src/app/services/photo.service';

@Component({
  selector: 'app-galleria',
  templateUrl: './galleria.component.html',
  styleUrls: ['./galleria.component.css'],
})
export class GalleriaComponent implements OnChanges {
  city!: City;
  @Input() idCity!: number | null;
  cityBlob!: Blob;
  cityPicture!: any;

  constructor(
    private cityService: CityService,
    private photoService: PhotoService,
    private messageService: MessageService
  ) {}

  ngOnChanges() {

    if (this.idCity) {
      console.log(this.idCity);

      this.cityService.getCityById(this.idCity).subscribe({
        next: (response) => {
          this.city = response;
          this.city.isVisible = false;
          if (this.city.photo && this.city.photo.length > 0) {
            for (let picture of this.city.photo) {
              this.photoService.getImageById(picture.id).subscribe({
                next: (data: Blob) => {
                  this.cityBlob = data;
                  this.createCityImageFromBlob(this.cityBlob, picture.id);
                },
                error: (error) => {
                  console.error('Erreur lors de la récupération de la photo', error);
                },
              });
            }
            
          }
        },
        error: (error) => {
          console.error('Erreur lors de la récupération de la ville', error);
        },
      });
    }
  }

  createCityImageFromBlob(image: Blob, id: number) {
    let reader = new FileReader();
    reader.readAsDataURL(image);
    this.cityPicture = this.city.photo.find((x) => x.id === id);
    reader.addEventListener('load', () => {
      if (this.cityPicture) this.cityPicture.picture = reader.result;
    });
  }

  onDeletePicture(idPicture: number) {
    console.log(idPicture);

    this.photoService.deletePicture(idPicture).subscribe({
      next: (response) => {
        this.messageService.add({
          severity: 'warn',
          summary: 'Opération réussie',
          detail: 'Photo supprimé',
        });
        this.ngOnChanges();
      },
    });
  }
}
