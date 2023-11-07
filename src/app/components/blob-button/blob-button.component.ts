import { Component, Input } from '@angular/core';
import { MessageService } from 'primeng/api';
import { City } from 'src/app/models/city';
import { Photo } from 'src/app/models/photo';
import { CityService } from 'src/app/services/city.service';
import { PhotoService } from 'src/app/services/photo.service';

@Component({
  selector: 'app-blob-button',
  templateUrl: './blob-button.component.html',
  styleUrls: ['./blob-button.component.css'],
})
export class BlobButtonComponent {
  myFile!: File;
  @Input() idCity!: number;
  @Input() idCountry!: number;
  cityWithCountry!: City;
  constructor(
    private photoService: PhotoService,
    private messageService: MessageService,
    private cityService: CityService,
  ) {}
  onChange(e: any) {
    console.log('city and country',this.idCity, this.idCountry);
    
    if (!this.idCity && this.idCountry) {
      this.idCity = NaN;
      this.myFile = e.target.files[0];
      if (this.myFile) {
        const formData = new FormData();
        formData.append('image', this.myFile);
        console.log(formData);

        this.photoService
          .postImage(formData, this.idCity, this.idCountry)
          .subscribe((photo: Partial<Photo>) => {
            this.messageService.add({
              severity: 'success',
              summary: 'Opération réussie',
              detail: 'Photo ajoutée avec succès',
            });
          });
      }
    }
    if (this.idCity && !this.idCountry) {
      this.cityService.getCityById(this.idCity).subscribe({
        next: (response) => {
          this.cityWithCountry = response;
          this.idCountry = this.cityWithCountry.country.id;
          console.log(response);
          console.log(e.target.files);
    this.myFile = e.target.files[0];
    if (this.myFile) {
      const formData = new FormData();
      formData.append('image', this.myFile);
      console.log(formData);
      
      this.photoService
        .postImage(formData, this.idCity, this.idCountry)
        .subscribe((photo: Partial<Photo>) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Opération réussie',
            detail: 'Photo ajoutée avec succès',
          });
          
        });
    }
      console.log('idcountry', this.idCountry);
          
          
        }
      })
    
    
    }
  }
}
