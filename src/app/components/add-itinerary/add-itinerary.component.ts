import { Type } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { City } from 'src/app/models/city';
import { Country } from 'src/app/models/country';
import { DynamicField } from 'src/app/models/dynamic-field';
import { Itinerary } from 'src/app/models/itinerary';
import { TransportCompany } from 'src/app/models/transport-company';
import { TransportType } from 'src/app/models/transport-type';
import { User } from 'src/app/models/user';
import { CityService } from 'src/app/services/city.service';
import { CompanyService } from 'src/app/services/company.service';
import { ItineraryService } from 'src/app/services/itinerary.service';
import { TypeService } from 'src/app/services/type.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-add-itinerary',
  templateUrl: './add-itinerary.component.html',
  styleUrls: ['./add-itinerary.component.css'],
})
export class AddItineraryComponent implements OnInit {
  visible: boolean = false;
  // countryWithCities: CountryWithCities[] = [];
  @Input() cityList!: City[];
  itineraryForm!: FormGroup;
  dynamicFields: DynamicField[] = [];
  selectedCity!: City;
  country!: Country;
  selectedDepartureCity!: number;
  selectedArrivalCity!: number;
  selectedTransportType!: number;
  selectedCompany!: number;
  allTypes!: TransportType[];
  allCompanies!: TransportCompany[];
  checked: boolean = true;
  originCity!: City;
  destinationCity!: City;
  creator!: User;
  company!: TransportCompany[];
  type!: TransportType[];
  cityStop!: City[];
  companiesIds!: number[];
  typeIds!: number[];
  cityStopIds!: number[];
  dynamicFieldsFormArray!: FormArray;
  constructor(
    private companyService: CompanyService,
    private typeService: TypeService,
    private itineraryService: ItineraryService,
    private userService: UserService,
    private cityService: CityService,
    private formBuilder: FormBuilder
  ) {
    this.itineraryForm = this.formBuilder.group({
      selectedDepartureCity: ['', Validators.required],
      selectedArrivalCity: ['', Validators.required],
      selectedTransportType: [''],
      selectedCompany: [''],
      dynamicFields: this.formBuilder.array([]),
    });

    this.dynamicFieldsFormArray = this.itineraryForm.get(
      'dynamicFields'
    ) as FormArray;
  }

  ngOnInit() {
    this.companyService.getAllCompanies().subscribe({
      next: (response) => {
        this.allCompanies = [...response];
      },
    });

    this.typeService.getAllTypes().subscribe({
      next: (response) => {
        this.allTypes = [...response];
      },
    });
    this.itineraryService
      .getItineraryUpdates()
      .subscribe((updatedItinerary) => {
        if (updatedItinerary) {
          // Faire quelque chose avec la nouvelle valeur de l'itinéraire
        }
      });
  }

  // if (this.countryList && this.cityList) {
  // this.countryWithCities = this.countryList.map((country) => ({
  //   country,
  //   cities: this.cityList.filter((city) => city.id_country === country.id),
  // }));
  //   console.log(this.countryWithCities);
  //   console.log(this.cityList);

  // }}
  uniqueCountries(): Country[] {
    const uniqueCountries: Country[] = [];
    const countryIds: Set<number> = new Set();
    if (this.cityList) {
      this.cityList.forEach((city) => {
        if (!countryIds.has(city.id_country)) {
          countryIds.add(city.id_country);
          this.country = {
            id: city.id_country,
            name: city.country.name,
            initial: city.country.initial,
            schengen: city.country.schengen,
            observation: city.country.observation,
            id_language: city.country.id_language,
            id_currency: city.country.id_currency,
            id_travel_document: city.country.id_travel_document,
            language: city.country.language,
            currency: city.country.currency,
            docs: city.country.docs,
            photo: city.country.photo,
            picture: city.country.picture,
          };
          uniqueCountries.push(this.country);
        }
      });
    }
    uniqueCountries.sort((a, b) => a.name.localeCompare(b.name));
    return uniqueCountries;
  }

  sortedCitiesByCountry(country: Country): City[] {
    const citiesForCountry = this.cityList
      .filter((city) => city.id_country === country.id)
      .sort((a, b) => a.name.localeCompare(b.name));
    return citiesForCountry;
  }

  showDialog() {
    this.visible = true;
  }

  closeDialog() {
    this.visible = false;
  }

  addField() {
    const formArray = this.itineraryForm.get('dynamicFields') as FormArray;
    formArray.push(this.createDynamicField());
  }

  createDynamicField(): FormGroup {
    return this.formBuilder.group({
      departureId: [''],
      stopId: [''],
      transportId: [''],
      companyId: [''],
    });
  }

  removeField(index: number) {
    const formArray = this.itineraryForm.get('dynamicFields') as FormArray;
    formArray.removeAt(index);
  }
  async onSubmit() {
    if (this.itineraryForm.valid) {
      const formValue = this.itineraryForm.value;
      console.log(formValue.dynamicFields);

      const newItinerary: Partial<Itinerary> = {
        id_origin_city: +formValue.selectedDepartureCity,
        id_destination_city: +formValue.selectedArrivalCity,
        id_user: +localStorage.getItem('id')!,
        cityStop: [],
        company: [],
        type: [],
      };

      // Fetch company information
      if (formValue.selectedCompany) {
        this.companyService
          .getCompanyById(+formValue.selectedCompany)
          .subscribe({
            next: (response) => {
              newItinerary.company!.push(response);

              // Call the next async operation here if needed
              this.handleNextOperation(newItinerary, formValue);
            },
            error: (error) => {
              console.error('Error fetching company information', error);
            },
          });
      } else {
        // Call the next async operation here if needed
        await this.handleNextOperation(newItinerary, formValue);
      }
    }
  }

  // This method can be used for additional async operations
  async handleNextOperation(newItinerary: Partial<Itinerary>, formValue: any) {
    // Fetch type information
    if (formValue.selectedTransportType) {
      this.typeService.getTypeById(+formValue.selectedTransportType).subscribe({
        next: (response) => {
          newItinerary.type!.push(response);
          // Continue with other async operations if needed
          // Finally, create the itinerary
          this.handleDynamicFieldsOperation(newItinerary, formValue);
        },
        error: (error) => {
          console.error('Error fetching type information', error);
        },
      });
    } else {
      // Continue with other async operations if needed
      // Finally, create the itinerary
      await this.handleDynamicFieldsOperation(newItinerary, formValue);
    }
  }

  async handleDynamicFieldsOperation(
    newItinerary: Partial<Itinerary>,
    formValue: any
  ) {
    // Fetch type information
    if (formValue.dynamicFields) {
      const companyIdArray = formValue.dynamicFields.map(
        (data: { companyId: number }) => data.companyId
      );
      const typeIdArray = formValue.dynamicFields.map(
        (data: { transportId: number }) => data.transportId
      );
      const cityStopIdArray = formValue.dynamicFields.map(
        (data: { stopId: number }) => data.stopId
      );

      // Exclude the last value for cityStopId
      cityStopIdArray.pop();

      // Utiliser Promise.all pour attendre toutes les promesses
      await Promise.all(
        companyIdArray.map(async (id: number) => {
          const company = await this.companyService
            .getCompanyById(id)
            .toPromise();
          newItinerary.company!.push(company!);
        })
      );

      await Promise.all(
        typeIdArray.map(async (id: number) => {
          const type = await this.typeService.getTypeById(id).toPromise();
          newItinerary.type!.push(type!);
        })
      );

      await Promise.all(
        cityStopIdArray.map(async (id: number) => {
          const city = await this.cityService.getCityById(id).toPromise();
          const newCity: Partial<City> = {
            id: city!.id,
            name: city!.name,
            id_stay_cat: city!.id_stay_cat,
            id_country: city!.id_country,
          };
          newItinerary.cityStop!.push(newCity);
        })
      );

      await this.createItinerary(newItinerary);
    }
  }

  createItinerary(newItinerary: Partial<Itinerary>) {
    this.itineraryService.createItinerary(newItinerary).subscribe({
      next: (createdItinerary) => {
        console.log('Itinerary created successfully:', createdItinerary);
      },
      error: (error) => {
        console.error('Error creating itinerary:', error);
      },
    });
  }
}