import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { City } from 'src/app/models/city';
import { Itinerary } from 'src/app/models/itinerary';
import { CityService } from 'src/app/services/city.service';
import { ItineraryService } from 'src/app/services/itinerary.service';
import { PhotoService } from 'src/app/services/photo.service';

@Component({
  selector: 'app-city-view',
  templateUrl: './city-view.component.html',
  styleUrls: ['./city-view.component.css']
})
export class CityViewComponent {
  city!: City;
  cityIdFromRoute!: number;
  cityBlob!: Blob;
  cityPicture!: any;
  itinerariesList!: Itinerary[];
  itinerariesByCity!: Itinerary[];


  constructor(
    private route: ActivatedRoute,
    private cityService: CityService,
    private photoService: PhotoService,
  private itineraryService: ItineraryService) { }


  ngOnInit() {
    const routeParam = this.route.snapshot.paramMap;
    this.cityIdFromRoute = Number(routeParam.get('id'));

    this.cityService.getCityById(this.cityIdFromRoute).subscribe({
      next: (response) => {
        this.city = response;
      }
    });

    this.itineraryService.getAllItineraries().subscribe({
      next: (response) => {
        this.itinerariesList = [...response];
        this.itinerariesByCity = [...this.itinerariesList.filter((way) => way.id_destination_city === this.cityIdFromRoute)]
    }
  })

    if (this.cityIdFromRoute) {
      console.log(this.cityIdFromRoute);

      this.cityService.getCityById(this.cityIdFromRoute).subscribe({
        next: (response) => {
          this.city = response;
          if (this.city.photo && this.city.photo.length > 0) {
            for (let picture of this.city.photo) {
              this.photoService.getImageById(picture.id).subscribe({
                next: (data: Blob) => {
                  this.cityBlob = data;
                  this.createCityImageFromBlob(this.cityBlob, picture.id);
                },
                error: (error) => {
                  console.error('Erreur lors de la récupération de la photo', error);
                },
              });
            }
            
          }
        },
        error: (error) => {
          console.error('Erreur lors de la récupération de la ville', error);
        },
      });
    }
  }

  createCityImageFromBlob(image: Blob, id: number) {
    let reader = new FileReader();
    reader.readAsDataURL(image);
    this.cityPicture = this.city.photo.find((x) => x.id === id);
    reader.addEventListener('load', () => {
      if (this.cityPicture) this.cityPicture.picture = reader.result;
    });
  }
}
