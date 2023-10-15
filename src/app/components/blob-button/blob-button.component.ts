import { Component } from '@angular/core';
import { Photo } from 'src/app/models/photo';
import { PhotoService } from 'src/app/services/photo.service';

@Component({
  selector: 'app-blob-button',
  templateUrl: './blob-button.component.html',
  styleUrls: ['./blob-button.component.css'],
})
export class BlobButtonComponent {
  myFile!: File;

  constructor(
    private photoService: PhotoService
  ) {}
  onChange(e: any) {
    console.log(e.target.files);
    this.myFile = e.target.files[0];
    if (this.myFile) {
      const formData = new FormData();
      formData.append('monFichier', this.myFile);

      this.photoService
        .postImage(formData)
        .subscribe((photo: Partial<Photo>) => {
          alert('image postée');
        });
    }
  }
}
