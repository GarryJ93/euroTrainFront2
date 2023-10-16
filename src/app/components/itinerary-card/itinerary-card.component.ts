import { Component, Input } from '@angular/core';
import { City } from 'src/app/models/city';
import { Country } from 'src/app/models/country';
import { Itinerary } from 'src/app/models/itinerary';
import { CityService } from 'src/app/services/city.service';
import { PhotoService } from 'src/app/services/photo.service';

@Component({
  selector: 'app-itinerary-card',
  templateUrl: './itinerary-card.component.html',
  styleUrls: ['./itinerary-card.component.css'],
})
export class ItineraryCardComponent {
  @Input() itineraries!: Itinerary;
  @Input() country!: Country;

  cityBlob!: Blob;
  cityImage!: any;

  constructor(private photoService: PhotoService) { }

  ngOnInit() {
    
    if (this.itineraries.destinationCity.photo[0]) {
      for (let picture of this.itineraries.destinationCity.photo) {
        if (this.itineraries.destinationCity.id === picture.id_city)
          this.photoService.getImageById(picture.id).subscribe({
            next: (data: Blob) => {
              this.cityBlob = data;
              this.createDestinationCityImageFromBlob(this.cityBlob, picture.id);
            },
          });
      }
    }
  }

  createDestinationCityImageFromBlob(image: Blob, id: number) {
    let reader = new FileReader();
    reader.readAsDataURL(image);
    const currentPicture = this.itineraries.destinationCity.photo.find((x) => x.id === id);

    reader.addEventListener('load', () => {
      console.log('ma photo', currentPicture);
      if (currentPicture) currentPicture.picture = reader.result;
    });
  }
}
