import { Component, Input, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Country } from 'src/app/models/country';
import { Itinerary } from 'src/app/models/itinerary';
import { ItineraryService } from 'src/app/services/itinerary.service';
import { PhotoService } from 'src/app/services/photo.service';

@Component({
  selector: 'app-admin-itinerary-card',
  templateUrl: './admin-itinerary-card.component.html',
  styleUrls: ['./admin-itinerary-card.component.css'],
})
export class AdminItineraryCardComponent implements OnInit {
  @Input() itineraries!: Itinerary;
  @Input() country!: Country;
  itinerary!: Itinerary;
  imageUrl: string = "http://localhost:3000/"
  cityBlob!: Blob;
  cityImage!: any;

  constructor(private photoService: PhotoService,
    private itineraryService: ItineraryService,
    private messageService: MessageService) { }

  ngOnInit() {

    this.itineraryService.getItineraryById(this.itineraries.id!).subscribe({
      next: (response) => {
        this.itinerary = response;
      }
    })
    //   if (this.itineraries.destinationCity.photo[0]) {
    //     for (let picture of this.itineraries.destinationCity.photo) {
    //       if (this.itineraries.destinationCity.id === picture.id_city)
    //         this.photoService.getImageById(picture.id).subscribe({
    //           next: (data: Blob) => {
    //             this.cityBlob = data;
    //             this.createDestinationCityImageFromBlob(
    //               this.cityBlob,
    //               picture.id
    //             );
    //           },
    //         });
    //     }
    //   }
    // }

    // createDestinationCityImageFromBlob(image: Blob, id: number) {
    //   let reader = new FileReader();
    //   reader.readAsDataURL(image);
    //   const currentPicture = this.itineraries.destinationCity.photo.find(
    //     (x) => x.id === id
    //   );

    //   reader.addEventListener('load', () => {
    //     if (currentPicture) currentPicture.picture = reader.result;
    //   });
    // }
  }

  onDeleteItinerary(idItinerary: number) {
    console.log(idItinerary);

    this.itineraryService.deleteItinerary(idItinerary).subscribe({
      next: (response) => {
        this.messageService.add({
          severity: 'warn',
          summary: 'Opération réussie',
          detail: 'Itinéraire supprimé',
        });
  
      }
    })
  }
}

