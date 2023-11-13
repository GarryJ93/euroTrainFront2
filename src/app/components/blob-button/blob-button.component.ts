import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
} from '@angular/core';
import { MessageService } from 'primeng/api';
import { City } from 'src/app/models/city';
import { Photo } from 'src/app/models/photo';
import { CityService } from 'src/app/services/city.service';
import { PhotoService } from 'src/app/services/photo.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-blob-button',
  templateUrl: './blob-button.component.html',
  styleUrls: ['./blob-button.component.css'],
})
export class BlobButtonComponent implements OnDestroy {
  myFile!: File;
  @Input() idCity!: number ;
  @Input() idCountry!: number;
  cityWithCountry!: City;
  uploading!: boolean;
  private subscriptions: Subscription[] = [];
  @Output() countryId = new EventEmitter<number>();

  constructor(
    private photoService: PhotoService,
    private messageService: MessageService,
    private cityService: CityService
  ) {}

  onChange(e: any) {
    console.log('city and country', this.idCity, this.idCountry);
    this.uploading = true;

    if (this.idCity === null && this.idCountry !== undefined) {
      this.uploadPhoto(this.idCity, this.idCountry, e.target.files[0]);
    } else if (this.idCity !== null && this.idCountry === undefined) {
      this.subscriptions.push(
        this.cityService.getCityById(this.idCity).subscribe({
          next: (response) => {
            this.cityWithCountry = response;
            this.idCountry = this.cityWithCountry.country.id;
            console.log(response);
            console.log(e.target.files);

            this.uploadPhoto(this.idCity!, this.idCountry, e.target.files[0]);
            console.log('idcountry', this.idCountry);
          },
        })
      );
    } else if (this.idCity !== null && this.idCountry !== undefined) {
      this.uploadPhoto(this.idCity!, this.idCountry, e.target.files[0]);
      console.log('idcountry', this.idCountry);
    }
  }

  private uploadPhoto(idCity: number | null, idCountry: number, file: File) {
    if (file) {
      const formData = new FormData();
      formData.append('image', file);
      console.log(formData);

      this.subscriptions.push(
        this.photoService.postImage(formData, idCity, idCountry).subscribe({
          next: (photo: Partial<Photo>) => {
            this.cityService.getAllCities().subscribe({
              next: (response) => {
                this.cityService.cityList$.next(response);
              },
            });
            this.messageService.add({
              severity: 'success',
              summary: 'Opération réussie',
              detail: 'Photo ajoutée avec succès',
            });
            this.countryId.emit(idCountry);
            this.uploading = false;
          },
          error: (error: any) => {
            console.error('Erreur lors du téléchargement de la photo', error);
            this.messageService.add({
              severity: 'error',
              summary: 'Échec',
              detail: "Impossible d'ajouter la photo",
            });
          },
        })
      );
    }
  }

  ngOnDestroy() {
    // Nettoyer les abonnements lors de la destruction du composant
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
