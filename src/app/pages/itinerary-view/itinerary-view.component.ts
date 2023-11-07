import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, forkJoin } from 'rxjs';

import { Itinerary } from 'src/app/models/itinerary';

import { ItineraryService } from 'src/app/services/itinerary.service';
import { PhotoService } from 'src/app/services/photo.service';

@Component({
  selector: 'app-itinerary-view',
  templateUrl: './itinerary-view.component.html',
  styleUrls: ['./itinerary-view.component.css'],
})
export class ItineraryViewComponent {
  itinerary!: Itinerary;
  itineraryIdFromRoute!: number;
  cityBlob!: Blob;
  cityPicture!: any;
  imageUrl: string = 'http://localhost:3000/';
  constructor(
    private route: ActivatedRoute,
    private photoService: PhotoService,
    private itineraryService: ItineraryService
  ) {}

  ngOnInit() {
    const routeParam = this.route.snapshot.paramMap;
    this.itineraryIdFromRoute = Number(routeParam.get('id'));

    this.itineraryService
      .getItineraryById(this.itineraryIdFromRoute)
      .subscribe({
        next: (response) => {
          this.itinerary = response;
          console.log(this.itinerary);

          // if (
          //   this.itinerary.destinationCity.photo &&
          //   this.itinerary.destinationCity.photo.length > 0
          // ) {
          //   const observables: Observable<Blob>[] =
          //     this.itinerary.destinationCity.photo.map((photo) =>
          //       this.photoService.getImageById(photo.id)
          //     );

          //   forkJoin(observables).subscribe({
          //     next: (data: Blob[]) => {
          //       this.itinerary.destinationCity.photo.forEach((photo, index) => {
          //         this.createCityImageFromBlob(photo.id, data[index]);
          //       });
          //     },
          //     error: (error) => {
          //       console.error('Error fetching photos', error);
          //     },
          //   });
          // }

          // if (this.itinerary.cityStop && this.itinerary.cityStop.length > 0) {
          //   this.itinerary.cityStop.forEach((city) => {
          //     if (city.photo && city.photo.length > 0) {
          //       const observables: Observable<Blob>[] = city.photo.map(
          //         (photo) => this.photoService.getImageById(photo.id)
          //       );

          //       forkJoin(observables).subscribe({
          //         next: (data: Blob[]) => {
          //           city.photo.forEach((photo, index) => {
          //             this.createCityImageFromBlob(photo.id, data[index]);
          //           });
          //         },
          //         error: (error) => {
          //           console.error('Error fetching photos', error);
          //         },
          //       });
          //     }
          //   });
          // }
        },
      });
  }

  // createCityImageFromBlob(id: number, data: Blob) {
  //   const cityPhoto = this.itinerary.destinationCity.photo.find(
  //     (photo) => photo.id === id
  //   );

  //   const reader = new FileReader();
  //   reader.readAsDataURL(data);
  //   reader.addEventListener('load', () => {
  //     if (cityPhoto) {
  //       cityPhoto.picture = reader.result as string;
  //     }
  //   });
  //   this.itinerary.cityStop.forEach((city) => {
  //     // Check if city has photos
  //     if (city.photo && city.photo.length > 0) {
  //       const stopPhoto = city.photo.find((photo) => photo.id === id);
  //       if (stopPhoto) {
  //         // Access the photo property of the current city
  //         const readerStop = new FileReader();
  //         readerStop.readAsDataURL(data);
  //         readerStop.addEventListener('load', () => {
  //           stopPhoto.picture = readerStop.result as string;
  //         });
  //       }
  //     }
  //   });
  // }
}
