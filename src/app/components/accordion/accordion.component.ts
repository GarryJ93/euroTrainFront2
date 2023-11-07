import { Component, Input, OnInit } from '@angular/core';
import { Country } from 'src/app/models/country';
import { CountryService } from 'src/app/services/country.service';
import { PhotoService } from 'src/app/services/photo.service';

@Component({
  selector: 'app-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.css'],
})
export class AccordionComponent implements OnInit {
  @Input() country!: Country;
  // countryBlob!: Blob;
  // countryImage!: any;
  actualCountry!: Country;
  imageUrl: string = 'http://localhost:3000/';


  constructor(
  private countryService: CountryService) {
    
  }

  ngOnInit() {
  if (this.country && this.country.id) {
    this.countryService.getCountryById(this.country.id).subscribe({
      next: (response) => {
        if(response) {
        this.actualCountry = response;
        console.log(response);}
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
}

    //   if (this.country.photo.length > 0) {
    //     for (let picture of this.country.photo) {

    //       if (this.country.id === picture.id_country)
        

    //       this.photoService.getImageById(picture.id).subscribe({
    //         next: (data: Blob) => {
    //           this.countryBlob = data;
    //           this.createCountryImageFromBlob(
    //             this.countryBlob,
    //             picture.id
    //           );
    //         },
    //       });
    //     }
    //   }
    // }

    // createCountryImageFromBlob(image: Blob, id: number) {
    //   let reader = new FileReader();
    //   reader.readAsDataURL(image);
    //   const currentPicture = this.country.photo.find(
    //     (x) => x.id === id
    //   );

    //   reader.addEventListener('load', () => {
    //     if (currentPicture) currentPicture.picture = reader.result;
    //   });
    // }
  }

