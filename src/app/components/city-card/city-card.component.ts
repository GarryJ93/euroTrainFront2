import { Component, Input, OnInit } from '@angular/core';
import { City } from 'src/app/models/city';
import { CityService } from 'src/app/services/city.service';
import { PhotoService } from 'src/app/services/photo.service';

@Component({
  selector: 'app-city-card',
  templateUrl: './city-card.component.html',
  styleUrls: ['./city-card.component.css'],
})
export class CityCardComponent implements OnInit {
  @Input() city!: City;
  cityCard!: City;
  imageUrl: string = 'http://localhost:3000/';

  constructor(
    private photoService: PhotoService,
    private cityService: CityService
  ) {}

  ngOnInit() {
    if (this.city) {
      this.cityService.getCityById(this.city.id).subscribe({
        next: (response) => {
          this.cityCard = response;
          console.log(this.cityCard);
        },
      });
    }

    //   console.log(this.city);

    //   if (this.city.photo && this.city.photo.length > 0) {
    //     const observables: Observable<Blob>[] = this.city.photo.map((photo) =>
    //       this.photoService.getImageById(photo.id)
    //     );

    //     forkJoin(observables).subscribe({
    //       next: (data: Blob[]) => {
    //         this.city.photo.forEach((photo, index) => {
    //           this.createCityImageFromBlob(photo.id, data[index]);
    //         });
    //       },
    //       error: (error) => {
    //         console.error('Error fetching photos', error);
    //       },
    //     });
    //   }
    // }

    // sanitizeImageUrl(imageUrl: string): SafeUrl {
    //   return this.sanitizer.bypassSecurityTrustUrl(imageUrl);
    // }

    // createCityImageFromBlob(id: number, data: Blob) {
    //   const cityPhoto = this.city.photo.find((photo) => photo.id === id);
    //   const reader = new FileReader();
    //   reader.readAsDataURL(data);
    //   reader.addEventListener('load', () => {
    //     if (cityPhoto) {
    //       cityPhoto.picture = reader.result as string;
    //     }
    //   });
  }
}
