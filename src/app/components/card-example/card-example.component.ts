import { Component, Input, OnChanges } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
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
    private photoService: PhotoService,
    private sanitizer: DomSanitizer 
  ) {}

  ngOnChanges() {
    console.log('myExample card', this.myExample);
    if (this.myExample && this.myExample.destinationCity.photo.length > 0) {
      let picture =
        this.myExample.destinationCity.photo[
          Math.round(
            Math.random() * (this.myExample.destinationCity.photo.length - 1)
          )
        ];
      if (picture.id && picture && this.myExample.destinationCity.id === picture.id_city )
        this.photoService.getImageById(picture.id).subscribe({
          next: (data: Blob) => {
            this.cityBlob = data;
            console.log(data, "mydata");
            
            this.createCityImageFromBlob(this.cityBlob, picture.id);
          },
        });
    }
  }
  sanitizeImageUrl(imageUrl: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(imageUrl);
  }

  createCityImageFromBlob(image: Blob, id: number) {
    console.log('Blob', this.cityBlob);
    let reader = new FileReader();
    reader.readAsDataURL(image);
    const currentPicture = this.myExample.destinationCity.photo.find(
      (x) => x.id === id
    );

    reader.addEventListener('load', () => {
      console.log('ma photo', currentPicture);
      if (currentPicture) {
        this.cityImage = currentPicture;
        currentPicture.picture = reader.result;
        console.log(currentPicture.picture);
      }
    });
  }
}
