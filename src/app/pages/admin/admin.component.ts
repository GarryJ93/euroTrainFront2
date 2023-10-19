import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { City } from 'src/app/models/city';
import { Country } from 'src/app/models/country';
import { Currency } from 'src/app/models/currency';
import { Itinerary } from 'src/app/models/itinerary';
import { Language } from 'src/app/models/language';
import { TravelDocument } from 'src/app/models/travel-document';
import { User } from 'src/app/models/user';
import { CityService } from 'src/app/services/city.service';
import { CountryService } from 'src/app/services/country.service';
import { CurrencyService } from 'src/app/services/currency.service';
import { ItineraryService } from 'src/app/services/itinerary.service';
import { LanguageService } from 'src/app/services/language.service';
import { TravelDocumentService } from 'src/app/services/travel-document.service';
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
  allCities!: City[];
  citiesToDisplay!: City[];
  citiesByCountry!: City[];
  select!: FormGroup;
  user!: User;
  card!: HTMLElement | null;
  visible: boolean = false;
  currentId!: number;
  allLanguages!: Language[];
  languagesToDisplay!: Language[];
  allCurrencies!: Currency[];
  currenciesToDisplay!: Currency[];
  allTravelDocuments!: TravelDocument[]
  travelDocumentsToDisplay!: TravelDocument[];
  idCountryForPicture!: number;
  idCityForPicture!: number;
  city!: City;

  constructor(
    private itineraryService: ItineraryService,
    private languageService: LanguageService,
    private currencyService: CurrencyService,
    private travelDocumentService: TravelDocumentService,
    private userService: UserService,
    private countryService: CountryService,
    private cityService: CityService,
    private fb: FormBuilder
  ) {}
  ngOnInit() {
    this.full_access = JSON.parse(localStorage.getItem('full_access')!);
    console.log(this.full_access);

    this.access = JSON.parse(localStorage.getItem('access')!);
    console.log(this.access);

    this.currentId = +localStorage.getItem('id')!;

    this.initialForm();

    this.itineraryService.getAllItineraries().subscribe({
      next: (response) => {
        {
          this.allItineraries = [...response];
          this.itinerariesToDisplay = [...response];
          this.itinerariesToDisplay = [
            ...this.itinerariesToDisplay.filter(
              (itinerary) => itinerary.id_user === +localStorage.getItem('id')!
            ),
          ];
          this.allUsersItineraries = [...this.itinerariesToDisplay];
        }
      },
    });

    this.userService.getAllUsers().subscribe({
      next: (response) => {
        {
          this.allUsers = [...response];
          this.usersToDisplay = [...response];
          this.candidateUser = [
            ...this.usersToDisplay.filter((user) => !user.access),
          ];
          this.adminUser = [
            ...this.usersToDisplay.filter(
              (user) => user.access && !user.full_access
            ),
          ];
        }
      },
    });

    this.countryService.getAllCountries().subscribe({
      next: (response) => {
        {
          this.allCountries = [...response];
          this.countriesToDisplay = [...response];
        }
      },
    });

    this.languageService.getAllLanguages().subscribe({
      next: (response) => {
        {
          this.allLanguages = [...response];
          this.languagesToDisplay = [...response];
        }
      },
    });

    this.currencyService.getAllCurrencies().subscribe({
      next: (response) => {
        {
          this.allCurrencies = [...response];
          this.currenciesToDisplay = [...response];
        }
      },
    });

    this.travelDocumentService.getAllTravelDocuments().subscribe({
      next: (response) => {
        {
          this.allTravelDocuments = [...response];
          this.travelDocumentsToDisplay = [...response];

          console.log(this.travelDocumentsToDisplay)
        }
      },
    });

    this.cityService.getAllCities().subscribe({
      next: (response) => {
        {
          this.allCities = [...response];
          this.citiesToDisplay = [...response];
        }
      },
    });
  }

  private initialForm() {
    this.select = this.fb.group({
      country: ['', Validators.required],
    });
  }

  onChange() {
    console.log(this.citiesToDisplay);
    if (this.select.valid) {
      let countryId: number = +this.select.value.country;
      this.citiesByCountry = [
        ...this.citiesToDisplay.filter((city) => city.id_country === countryId),
      ];
      console.log(this.citiesByCountry);
    }
  }

  OnAcceptNewAdmin(idUser: number) {
    console.log(idUser);
    const updateUser = {
      access: true,
    };
    this.userService.updateAdminStatus(idUser, updateUser).subscribe({
      next: (response) => {
        console.log('Admin validé', response);
        location.reload();
      },
      error: (error) => {
        console.error('Erreur lors de la mise à jour', error);
      },
    });
  }

  OnDeleteAllDataUser(idUser: number) {
    this.userService.deleteUserAndData(idUser).subscribe({
      next: (response) => {
        alert('Opération réussie');
        location.reload();
      },
      error: (error) => {
        console.error('Erreur lors de la suppression', error);
      },
    });
  }

  OnSoftDeleteUser(idUser: number) {
    this.userService.softDeleteUser(idUser).subscribe({
      next: (response) => {
        alert('Utilisateur supprimé');
        this.closeDialog();
        location.reload();
      },
      error: (error) => {
        console.error('Erreur lors de la suppression', error);
      },
    });
  }

  OnDeleteCountry(idCountry: number) {
    this.countryService.deleteCountry(idCountry).subscribe({
      next: (response) => {
        alert('Pays supprimé');
        location.reload();
      },
    });
  }

  showDialog() {
    this.visible = true;
  }

  closeDialog() {
    this.visible = false;
  }

  getCountryId(id: string) {
    this.idCountryForPicture = +id;
    console.log(this.idCountryForPicture);
    return this.idCountryForPicture;
  }

  getCityId(id: string) {
    this.idCityForPicture = +id;
    this.cityService.getCityById(this.idCityForPicture).subscribe({
      next: (response) => {
        this.city = response;
        this.idCountryForPicture = this.city.id_country
      }
    });
console.log(this.city)
    
  }
}
