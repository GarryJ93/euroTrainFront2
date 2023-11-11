import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { MessageService } from 'primeng/api';
import { lastValueFrom } from 'rxjs';
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
  imageUrl: string = 'http://localhost:3000/';
  @Output() countryId = new EventEmitter<number>();

  constructor(
    private cityService: CityService,
    private photoService: PhotoService,
    private messageService: MessageService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnChanges() {
    if (this.idCity) {
      this.cityService.getCityById(this.idCity).subscribe({
        next: (response) => {
          this.city = response;
          console.log('galleria', this.city);
        },
      });
    }
    // if (this.idCity) {
    //   console.log(this.idCity);

    //   this.cityService.getCityById(this.idCity).subscribe({
    //     next: async (response) => {
    //       this.city = response;
    //       if (this.city.photo && this.city.photo.length > 0) {
    //         for (let picture of this.city.photo) {
    //           try {
    //             const data: Blob = await lastValueFrom(
    //               this.photoService.getImageById(picture.id)
    //             );
    //             this.createCityImageFromBlob(picture.id, data!);
    //           } catch (error) {
    //             console.error(
    //               'Erreur lors de la récupération de la photo',
    //               error
    //             );
    //           }
    //         }
    //       }
    //     },
    //     error: (error) => {
    //       console.error('Erreur lors de la récupération de la ville', error);
    //     },
    //   });
    // }
  }

  // sanitizeImageUrl(imageUrl: string): SafeUrl {
  //   return this.sanitizer.bypassSecurityTrustUrl(imageUrl);
  // }

  // createCityImageFromBlob(id: number, data: Blob) {
  //   this.cityPicture = this.city.photo.find((x) => x.id === id);
  //   const reader = new FileReader();
  //   reader.readAsDataURL(data);
  //   reader.addEventListener('load', () => {
  //     if (this.cityPicture) {
  //       this.cityPicture.picture = reader.result;
  //     }
  //   });
  // }

  onDeletePicture(idPicture: number) {
    console.log(idPicture);

    this.photoService.deletePicture(idPicture).subscribe({
      next: (response) => {
        this.countryId.emit(this.city.id_country);
        this.messageService.add({
          severity: 'warn',
          summary: 'Opération réussie',
          detail: 'Photo supprimé',
        });
      },
    });
  }
}
