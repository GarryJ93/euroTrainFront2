import { Component, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
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
import * as emailjs from 'emailjs-com';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit, OnChanges, OnDestroy {
  access!: Boolean;
  full_access!: Boolean;
  allItineraries!: Itinerary[];
  itinerariesToDisplay!: Itinerary[];
  itinerariesToDisplayUser!: Itinerary[];
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
  visible!: boolean;
  currentId!: number;
  allLanguages!: Language[];
  languagesToDisplay!: Language[];
  allCurrencies!: Currency[];
  currenciesToDisplay!: Currency[];
  allTravelDocuments!: TravelDocument[];
  travelDocumentsToDisplay!: TravelDocument[];
  idCountryForPicture!: number;
  idsChecked!: number[];
  userInput!: string;
  itinerariesCountByAdmin: Record<number, number> = {};
  citiesByCountryWithPictures: City[] = [];
  cityWithPicture!: City;
  idUser!: number;
  private subscriptions: Subscription[] = [];
  constructor(
    private itineraryService: ItineraryService,
    private languageService: LanguageService,
    private currencyService: CurrencyService,
    private travelDocumentService: TravelDocumentService,
    private userService: UserService,
    private countryService: CountryService,
    private cityService: CityService,
    private messageService: MessageService,
    private fb: FormBuilder
  ) {}
  ngOnInit() {
    this.full_access = JSON.parse(localStorage.getItem('full_access')!);

    this.access = JSON.parse(localStorage.getItem('access')!);

    this.currentId = +localStorage.getItem('id')!;

    this.initialForm();

    this.itineraryService.getAllItineraries().subscribe({
      next: (response) => {
        this.itineraryService.itineraryList$.next(response);
      },
    });

    const obsItinerary = this.itineraryService.itineraryList$.subscribe({
      next: (response) => {
        this.allItineraries = [...response];
        this.itinerariesToDisplay = [...response];
        this.itinerariesToDisplayUser = [
          ...this.itinerariesToDisplay.filter(
            (itinerary) => itinerary.id_user === this.currentId
          ),
        ];
        this.allUsersItineraries = [...this.itinerariesToDisplay];

        this.userService.getAllUsers().subscribe({
          next: (response) => {
            this.userService.allUsers$.next(response);
            this.userService.candidateUsers$.next(response);
            this.userService.adminUsers$.next(response);
            const obsAllUsers = this.userService.allUsers$.subscribe({
              next: (response) => {
                this.allUsers = [...response];
                this.usersToDisplay = [...response];
              },
            });
            this.subscriptions.push(obsAllUsers);

            const obsCandidate = this.userService.candidateUsers$.subscribe({
              next: (response) => {
                this.candidateUser = [
                  ...response.filter((user) => !user.access),
                ];
              },
            });
            this.subscriptions.push(obsCandidate);

            const obsAdmin = this.userService.adminUsers$.subscribe({
              next: (response) => {
                this.adminUser = [
                  ...response.filter(
                    (user) => user.access && !user.full_access
                  ),
                ];
                console.log(this.adminUser);
                
              },
            });
            this.subscriptions.push(obsAdmin);
            this.onCount();
          },
        });
      },
    });
    this.subscriptions.push(obsItinerary);

    const obsCountryList = this.countryService.countryList$.subscribe({
      next: (response) => {
        this.allCountries = [...response];
        this.countriesToDisplay = [...response];
        this.countriesToDisplay.sort((a, b) => a.name.localeCompare(b.name));
      },
    });
    this.subscriptions.push(obsCountryList);

    this.countryService.getAllCountries().subscribe({
      next: (response) => {
        this.countryService.countryList$.next(response);
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
        }
      },
    });
    this.cityService.getAllCities().subscribe({
      next: (response) => {
        this.cityService.cityList$.next(response);
      },
    });

    const obsCities = this.cityService.cityList$.subscribe({
      next: (response) => {
        {
          this.allCities = [...response];
          this.citiesToDisplay = [...response];
        }
      },
    });
    this.subscriptions.push(obsCities);
  }

  ngOnChanges() {
    this.userService.getAllUsers().subscribe({
          next: (response) => {
            this.userService.allUsers$.next(response);
            this.userService.candidateUsers$.next(response);
            this.userService.adminUsers$.next(response);
            const obsAllUsers = this.userService.allUsers$.subscribe({
              next: (response) => {
                this.allUsers = [...response];
                this.usersToDisplay = [...response];
              },
            });
            this.subscriptions.push(obsAllUsers);

            const obsCandidate = this.userService.candidateUsers$.subscribe({
              next: (response) => {
                this.candidateUser = [
                  ...response.filter((user) => !user.access),
                ];
              },
            });
            this.subscriptions.push(obsCandidate);

            const obsAdmin = this.userService.adminUsers$.subscribe({
              next: (response) => {
                this.adminUser = [
                  ...response.filter(
                    (user) => user.access && !user.full_access
                  ),
                ];
                console.log(this.adminUser);
                
              },
            });
            this.subscriptions.push(obsAdmin);
            this.onCount();
          },
        });
      }
    
  

  private initialForm() {
    this.select = this.fb.group({
      country: ['', Validators.required],
    });
  }

  onCount() {
    if (this.allItineraries && this.adminUser) {
      this.adminUser.forEach((admin) => {
        const adminItineraries = [
          ...this.allItineraries.filter(
            (itinerary) => itinerary.id_user === admin.id
          ),
        ];
        this.itinerariesCountByAdmin[admin.id] = adminItineraries.length;
      });
    }
  }

  onSubmit(countryId: number) {
    console.log(countryId);
    this.cityService.getAllCities().subscribe({
      next: (response) => {
        this.cityService.cityList$.next(response);
        // let countryId: number = +this.select.value.country;
        this.citiesByCountry = [
          ...this.citiesToDisplay.filter(
            (city) => city.id_country === countryId
          ),
        ];
        this.citiesByCountryWithPictures = [];
        this.citiesByCountry.forEach((city) => {
          this.cityService.getCityById(city.id).subscribe({
            next: (response) => {
              console.log(response);
              this.cityWithPicture = response;
              this.citiesByCountryWithPictures.push(this.cityWithPicture);
            },
          });
          this.citiesByCountryWithPictures =
            this.citiesByCountryWithPictures.map((city) => ({
              ...city,
              isVisible: false,
              isEditing: false,
            }));
        });
        console.log(this.citiesByCountry);
      },
    });
  }

  OnAcceptNewAdmin(idUser: number) {
    console.log(idUser);
    const updateUser = {
      access: true,
    };

    this.userService.updateAdminStatus(idUser, updateUser).subscribe({
      next: (response) => {
        this.userService.getAllUsers().subscribe({
          next: (response) => {
            this.userService.adminUsers$.next(response);
            this.userService.candidateUsers$.next(response);
            this.userService.allUsers$.next(response);

            this.messageService.add({
              severity: 'success',
              summary: 'Félicitations',
              detail: 'Utilisateur accepté.',
            });
            const user = this.allUsers.find((user) => user.id === idUser);
            console.log(user);

            if (user) {
              const templateParams = {
                to_email: user.email,
                user_name: user.name,
                user_id: user.id,
                from_name: 'EuroTrain',
                message:
                  'Votre compte a été validé, félicitations et bienvenue parmi nos contributeurs.',
              };

              emailjs
                .send(
                  'service_73hokvk',
                  'template_uxjaxkd',
                  templateParams,
                  '4cxfky9LnJQXAKYwU'
                )
                .then((response) => {
                  console.log('Email sent successfully:', response);
                })
                .catch((error) => {
                  console.error('Error sending email:', error);
                });
            }
          },
          error: (error) => {
            console.error('Erreur lors de la mise à jour', error);
          },
        });
      },
    });
  }

  OnDeleteAllDataUser(idUser: number) {
    console.log(idUser);

    this.userService.deleteUserAndData(idUser).subscribe({
      next: (response) => {
        this.userService.getAllUsers().subscribe({
          next: (response) => {
            this.userService.adminUsers$.next(response);
            this.userService.candidateUsers$.next(response);
            this.userService.allUsers$.next(response);
          },
        });
        this.messageService.add({
          severity: 'error',
          summary: 'Supprimé',
          detail: 'Données effacées',
        });
      },
      error: (error) => {
        console.error('Erreur lors de la suppression', error);
      },
    });
  }

  OnDeleteCountry(idCountry: number) {
    this.countryService.deleteCountry(idCountry).subscribe({
      next: (response) => {
        this.countryService.getAllCountries().subscribe({
          next: (response) => {
            this.countryService.countryList$.next(response);
          },
        });
        this.messageService.add({
          severity: 'error',
          summary: 'Supprimé',
          detail: 'Pays et itinéraires associés supprimés',
        });
      },
    });
  }

  showDialog(user: User) {
    if(user)this.user = user;
    this.user.visible = true;
    
    console.log(this.user.visible, 'visible');
  }

  handleNewVisible(value: boolean) {
    this.visible = value;
    console.log('New visible value:', value);
  }

  getCountryId(id: string) {
    this.idCountryForPicture = +id;
    console.log(this.idCountryForPicture);
    return this.idCountryForPicture;
  }

  onFilterItineraries(userIdsTab: number[]) {
    this.idsChecked = userIdsTab;
    console.log(this.idsChecked);

    this.onUserInteractionFiltre();
  }

  onSearch(searchInput: string) {
    this.userInput = searchInput;

    this.onUserInteractionFiltre();
  }

  onUserInteractionFiltre() {
    this.itinerariesToDisplay = [...this.allItineraries];
    if (this.userInput) {
      this.itinerariesToDisplay = [
        ...this.itinerariesToDisplay.filter((way) => {
          const originCityName = way.originCity.name.toLowerCase();
          const destinationCityName = way.destinationCity.name.toLowerCase();

          const isOriginMatch = originCityName.includes(
            this.userInput.toLowerCase()
          );
          const isDestinationMatch = destinationCityName.includes(
            this.userInput.toLowerCase()
          );
          const isCityStopMatch = way.cityStop.some((stop) => {
            return (
              stop.name &&
              stop.name.toLowerCase().includes(this.userInput.toLowerCase())
            );
          });
          return isOriginMatch || isDestinationMatch || isCityStopMatch;
        }),
      ];
    }
    if (this.idsChecked && this.idsChecked.length > 0) {
      console.log(this.idsChecked);

      this.itinerariesToDisplay = [
        ...this.itinerariesToDisplay.filter((way) =>
          this.idsChecked.includes(way.id_user)
        ),
      ];
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
    console.log(this.subscriptions, 'after');
  }
}
