import { Component, Input } from '@angular/core';
import { City } from 'src/app/models/city';
import { PhotoService } from 'src/app/services/photo.service';

@Component({
  selector: 'app-city-card',
  templateUrl: './city-card.component.html',
  styleUrls: ['./city-card.component.css']
})
export class CityCardComponent {
  @Input() city!: City;

  cityBlob!: Blob;
  cityImage!: any;

  constructor(private photoService: PhotoService) { }

  ngOnInit() {

    console.log(this.city);
    
    
    if (this.city.photo.length > 0) {
      for (let picture of this.city.photo) {
        if (this.city.id === picture.id_city)
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
    const currentPicture = this.city.photo.find((x) => x.id === id);

    reader.addEventListener('load', () => {
      if (currentPicture) currentPicture.picture = reader.result;
    });
  }

}
