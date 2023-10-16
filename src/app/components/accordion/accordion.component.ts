import { Component, Input } from '@angular/core';
import { Country } from 'src/app/models/country';
import { PhotoService } from 'src/app/services/photo.service';

@Component({
  selector: 'app-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.css'],
})
export class AccordionComponent {
  @Input() country!: Country;
  countryBlob!: Blob;
  countryImage!: any;


  constructor(private photoService: PhotoService) {
    
  }

  ngOnInit() {
    

    console.log(this.country)
    if (this.country.photo[0]) {
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
      console.log('ma photo' ,reader)
      if (currentPicture) currentPicture.picture = reader.result;
    });
  }
}
