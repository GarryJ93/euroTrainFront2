import { Component } from '@angular/core';
import { Country } from 'src/app/models/country';
import { Itinerary } from 'src/app/models/itinerary';
import { User } from 'src/app/models/user';
import { CountryService } from 'src/app/services/country.service';
import { ItineraryService } from 'src/app/services/itinerary.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent {
  access!: Boolean;
  full_access!: Boolean;
  allItineraries!: Itinerary[];
  itinerariesToDisplay!: Itinerary[];
  allUsers!: User[];
  usersToDisplay!: User[];
  candidateUser!: User[];
  adminUser!: User[];
  allUsersItineraries!: Itinerary[];
  allCountries!: Country[];
  countriesToDisplay!: Country[];

  constructor(private itineraryService: ItineraryService,
    private userService: UserService,
  private countryService: CountryService) { }
  ngOnInit() {
    this.full_access = JSON.parse(localStorage.getItem('full_access')!);
    console.log(this.full_access);

    this.access = JSON.parse(localStorage.getItem('access')!);
    console.log(this.access);

    this.itineraryService.getAllItineraries().subscribe({
      next: (response) => {
        {
          this.allItineraries = [...response];
          this.itinerariesToDisplay = [...response];
          this.itinerariesToDisplay = [...this.itinerariesToDisplay.filter((itinerary) => itinerary.id_user === +(localStorage.getItem('id')!))];
          this.allUsersItineraries = [...this.itinerariesToDisplay];

          console.log(this.itinerariesToDisplay);
          
        }
      },
    });

    this.userService.getAllUsers().subscribe({
      next: (response) => {
        {
          this.allUsers = [...response];
          this.usersToDisplay = [...response];
          this.candidateUser = [...this.usersToDisplay.filter((user) => !user.access)];
          this.adminUser = [...this.usersToDisplay.filter(
            (user) => user.access && !user.full_access
          )];
          
        }
      },
    });

    this.countryService.getAllCountries().subscribe({
      next: (response) => {
        {
          this.allCountries = [...response];
          this.countriesToDisplay = [...response];
        }
      }
    })
  }
}
