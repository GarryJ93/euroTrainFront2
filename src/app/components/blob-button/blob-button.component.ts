import { Component, Input } from '@angular/core';
import { Photo } from 'src/app/models/photo';
import { PhotoService } from 'src/app/services/photo.service';

@Component({
  selector: 'app-blob-button',
  templateUrl: './blob-button.component.html',
  styleUrls: ['./blob-button.component.css'],
})
export class BlobButtonComponent {
  myFile!: File;
  @Input() idCountry!: number;
  @Input() idCity!: number;

  constructor(
    private photoService: PhotoService
  ) {}
  onChange(e: any) {
    if (!this.idCity) {
      this.idCity = NaN;
    }
    
    console.log(e.target.files);
    this.myFile = e.target.files[0];
    if (this.myFile) {
      const formData = new FormData();
      formData.append('monFichier', this.myFile);
      console.log(formData);
      
      this.photoService
        .postImage(formData, this.idCity, this.idCountry)
        .subscribe((photo: Partial<Photo>) => {
          alert('image postée');
        });
    }
  }
}
