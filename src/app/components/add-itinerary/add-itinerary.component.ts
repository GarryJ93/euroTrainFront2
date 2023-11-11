
import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { firstValueFrom } from 'rxjs';
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

@Component({
  selector: 'app-add-itinerary',
  templateUrl: './add-itinerary.component.html',
  styleUrls: ['./add-itinerary.component.css'],
})
export class AddItineraryComponent implements OnInit, OnChanges {
  visible: boolean = false;
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
  uniqueCountries: Country[] = [];
  constructor(
    private companyService: CompanyService,
    private typeService: TypeService,
    private itineraryService: ItineraryService,
    private cityService: CityService,
    private formBuilder: FormBuilder,
    private messageService: MessageService
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
        }
      });
  }

  ngOnChanges() {
    this.getUniqueCountries();
  }

  getUniqueCountries() {
    const countryIds: Set<number> = new Set();
    if (this.cityList) {
      this.cityList.forEach((city) => {
        this.cityService.getCityByIdWithCountry(city.id).subscribe({
          next: (response) => {
            if (!countryIds.has(city.id_country)) {
              countryIds.add(city.id_country);
              this.country = {
                id: response.id_country,
                name: response.country.name,
                initial: response.country.initial,
                schengen: response.country.schengen,
                observation: response.country.observation,
                id_language: response.country.id_language,
                id_currency: response.country.id_currency,
                id_travel_document: response.country.id_travel_document,
                language: response.country.language,
                currency: response.country.currency,
                docs: response.country.docs,
                photo: response.country.photo,
              };
              this.uniqueCountries.push(this.country);

              this.uniqueCountries.sort((a, b) => a.name.localeCompare(b.name));
              // }
            }
          },
        });
      });
    }
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

      if (formValue.selectedCompany) {
        this.companyService
          .getCompanyById(+formValue.selectedCompany)
          .subscribe({
            next: (response) => {
              newItinerary.company!.push(response);

              this.handleNextOperation(newItinerary, formValue);
            },
            error: (error) => {
              console.error('Error fetching company information', error);
            },
          });
      } else {
        await this.handleNextOperation(newItinerary, formValue);
      }
    }
  }

  async handleNextOperation(newItinerary: Partial<Itinerary>, formValue: any) {
    if (formValue.selectedTransportType) {
      this.typeService.getTypeById(+formValue.selectedTransportType).subscribe({
        next: (response) => {
          newItinerary.type!.push(response);

          this.handleDynamicFieldsOperation(newItinerary, formValue);
        },
        error: (error) => {
          console.error('Error fetching type information', error);
        },
      });
    } else {
      await this.handleDynamicFieldsOperation(newItinerary, formValue);
    }
  }

  async handleDynamicFieldsOperation(
    newItinerary: Partial<Itinerary>,
    formValue: any
  ) {
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

      cityStopIdArray.pop();

      await Promise.all(
        companyIdArray.map(async (id: number) => {
          const company = await firstValueFrom(
            this.companyService.getCompanyById(id)
          );
          newItinerary.company!.push(company);
        })
      );

      await Promise.all(
        typeIdArray.map(async (id: number) => {
          const type = await firstValueFrom(this.typeService.getTypeById(id));
          newItinerary.type!.push(type);
        })
      );

      await Promise.all(
        cityStopIdArray.map(async (id: number) => {
          const city = await firstValueFrom(this.cityService.getCityById(id));
          newItinerary.cityStop!.push(city);
        })
      );

      this.createItinerary(newItinerary);
    }
  }

  createItinerary(newItinerary: Partial<Itinerary>) {
    this.itineraryService.createItinerary(newItinerary).subscribe({
      next: (createdItinerary) => {
        this.itineraryService.getAllItineraries().subscribe({
          next: (response) => {
            this.itineraryService.itineraryList$.next(response);
          },
        });
        console.log('Itinerary created successfully:', createdItinerary);
        this.messageService.add({
          severity: 'success',
          summary: 'Opération réussie',
          detail: 'Itinéraire ajouté',
        });
        this.closeDialog();
      },
      error: (error) => {
        console.error('Error creating itinerary:', error);
        this.messageService.add({
          severity: 'danger',
          summary: 'Opération inaboutie',
          detail: "Impossible d'ajouter l'itinéraire",
        });
      },
    });
  }
}