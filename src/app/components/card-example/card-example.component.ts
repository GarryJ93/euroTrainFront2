import { Component, Input, OnChanges } from '@angular/core';
import { Itinerary } from 'src/app/models/itinerary';
import { ItineraryService } from 'src/app/services/itinerary.service';
import { PhotoService } from 'src/app/services/photo.service';

@Component({
  selector: 'app-card-example',
  templateUrl: './card-example.component.html',
  styleUrls: ['./card-example.component.css'],
})
export class CardExampleComponent implements OnChanges {
  @Input() myExample!: Itinerary;
  cityBlob!: Blob;
  cityImage!: any;
  constructor(
    private itineraryService: ItineraryService,
    private photoService: PhotoService
  ) {}

  ngOnChanges() {
    console.log('myExample card',this.myExample)
    if (this.myExample && this.myExample.destinationCity.photo[0]) {
      for (let picture of this.myExample.destinationCity.photo) {
        if (this.myExample.destinationCity.id === picture.id_city)
          this.photoService.getImageById(picture.id).subscribe({
            next: (data: Blob) => {
              this.cityBlob = data;
              this.createCityImageFromBlob(this.cityBlob, picture.id);
            },
          });
      }
    }
  }

  createCityImageFromBlob(image: Blob, id: number) {
    console.log('Blob', this.cityBlob)
    let reader = new FileReader();
    reader.readAsDataURL(image);
    const currentPicture = this.myExample.destinationCity.photo.find((x) => x.id === id);

    reader.addEventListener('load', () => {
      console.log('ma photo', currentPicture);
      if (currentPicture) {
        this.cityImage = currentPicture;
        currentPicture.picture = reader.result
      };
    });
  }
}
