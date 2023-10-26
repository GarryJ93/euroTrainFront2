import { Component, Input, OnInit } from '@angular/core';
import { Country } from 'src/app/models/country';
import { PhotoService } from 'src/app/services/photo.service';

@Component({
  selector: 'app-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.css'],
})
export class AccordionComponent implements OnInit{
  @Input() country!: Country;
  countryBlob!: Blob;
  countryImage!: any;


  constructor(private photoService: PhotoService) {
    
  }

  ngOnInit() {
    
    if (this.country.photo.length > 0) {
      for (let picture of this.country.photo) {

        if (this.country.id === picture.id_country)
        

        this.photoService.getImageById(picture.id).subscribe({
          next: (data: Blob) => {
            this.countryBlob = data;
            this.createCountryImageFromBlob(
              this.countryBlob,
              picture.id
            );
          },
        });
      }
    }
  }

  createCountryImageFromBlob(image: Blob, id: number) {
    let reader = new FileReader();
    reader.readAsDataURL(image);
    const currentPicture = this.country.photo.find(
      (x) => x.id === id
    );

    reader.addEventListener('load', () => {
      if (currentPicture) currentPicture.picture = reader.result;
    });
  }
}
