import { Component, Input } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Country } from 'src/app/models/country';
import { Currency } from 'src/app/models/currency';
import { Language } from 'src/app/models/language';
import { TravelDocument } from 'src/app/models/travel-document';
import { CountryService } from 'src/app/services/country.service';

@Component({
  selector: 'app-add-country',
  templateUrl: './add-country.component.html',
  styleUrls: ['./add-country.component.css'],
})
export class AddCountryComponent {
  visible: boolean = false;
  addCountry!: FormGroup;
  @Input() languageList!: Language[];
  @Input() currencyList!: Currency[];
  @Input() travelDocumentList!: TravelDocument[];

  constructor(
    private fb: FormBuilder,
    private countryService: CountryService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.initialForm();
  }
  private initialForm() {
    this.addCountry = this.fb.group({
      name: new FormControl('', Validators.required),
      initial: new FormControl('', Validators.required),
      language: new FormControl('', Validators.required),
      currency: new FormControl('', Validators.required),
      docs: new FormControl('', Validators.required),
      schengen: new FormControl(''),
      observation: new FormControl(''),
    });
  }
  showDialog() {
    this.visible = true;
  }

  closeDialog() {
    this.visible = false;
  }

  onAddCountry() {
    let newCountry: Country = {
      ...this.addCountry.value,
    };

    newCountry.id_language = +newCountry.language;
    newCountry.id_currency = +newCountry.currency;
    newCountry.id_travel_document = Number(newCountry.docs);
    newCountry.initial = newCountry.initial.toUpperCase();

    console.log(newCountry);

    console.log(this.addCountry);
    if (!this.addCountry.valid) {
      newCountry = {
        ...this.addCountry.value,
      };
    }
    this.countryService.addCountry(newCountry).subscribe({
      next: () => {
        this.countryService.getAllCountries().subscribe({
          next: (response) => {
            this.countryService.countryList$.next(response);
          },
        });
        this.messageService.add({
          severity: 'success',
          summary: 'Opération réussie',
          detail: 'Pays ajouté avec succès',
        });
        this.addCountry.reset();
        this.closeDialog();
      },
      error: (error) => {
        console.error("Erreur lors de l'ajout du pays", error);
      },
    });
  }
}
