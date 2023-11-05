import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { forkJoin, Observable } from 'rxjs';
import { City } from 'src/app/models/city';
import { PhotoService } from 'src/app/services/photo.service';

@Component({
  selector: 'app-city-card',
  templateUrl: './city-card.component.html',
  styleUrls: ['./city-card.component.css'],
})
export class CityCardComponent implements OnInit {
  @Input() city!: City;

  constructor(
    private photoService: PhotoService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    console.log(this.city);

    if (this.city.photo && this.city.photo.length > 0) {
      const observables: Observable<Blob>[] = this.city.photo.map((photo) =>
        this.photoService.getImageById(photo.id)
      );

      forkJoin(observables).subscribe({
        next: (data: Blob[]) => {
          this.city.photo.forEach((photo, index) => {
            this.createCityImageFromBlob(photo.id, data[index]);
          });
        },
        error: (error) => {
          console.error('Error fetching photos', error);
        },
      });
    }
  }

  sanitizeImageUrl(imageUrl: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(imageUrl);
  }

  createCityImageFromBlob(id: number, data: Blob) {
    const cityPhoto = this.city.photo.find((photo) => photo.id === id);
    const reader = new FileReader();
    reader.readAsDataURL(data);
    reader.addEventListener('load', () => {
      if (cityPhoto) {
        cityPhoto.picture = reader.result as string;
      }
    });
  }
}
