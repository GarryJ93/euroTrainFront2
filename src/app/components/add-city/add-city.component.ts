import { Component, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { City } from 'src/app/models/city';
import { Country } from 'src/app/models/country';
import { StayCat } from 'src/app/models/stay-cat';
import { CityService } from 'src/app/services/city.service';
import { StayCatService } from 'src/app/services/stay-cat.service';

@Component({
  selector: 'app-add-city',
  templateUrl: './add-city.component.html',
  styleUrls: ['./add-city.component.css']
})
export class AddCityComponent {
 visible: boolean = false;
  addCity!: FormGroup;
  @Input() countries!: Country[];
  allCategories!: StayCat[];
  categoriesToDisplay!: StayCat[]; 
  

  constructor(private fb: FormBuilder,
    private cityService: CityService,
  private stayCatService: StayCatService) { }

  ngOnInit(): void {
    this.initialForm();

    this.stayCatService.getAllStayCats().subscribe({
      next: (response) => {
        this.allCategories = [...response];
        this.categoriesToDisplay = [...response];
      }
    })
  }
  private initialForm() {
    this.addCity = this.fb.group({
      name: new FormControl('', Validators.required),
      country: new FormControl(''),
      category: new FormControl(''),
    });
  }
  showDialog() {
    this.visible = true;
  }

  closeDialog() {
    this.visible = false;
  }

  onAddCity() {
    let newCity: City = {
      ...this.addCity.value,
    };

    newCity.id_country = +(newCity.country);
    newCity.id_stay_cat = +(newCity.category);
    

    console.log(newCity);

    console.log(this.addCity);
    if (!this.addCity.valid) {
      newCity = {
        ...this.addCity.value,
        
      };
    }
    this.cityService.addCity(newCity).subscribe({
      next: () => {
        alert('Ville ajoutée avec succès !');
        this.addCity.reset();
        this.closeDialog()
      },
      error: (error) => {
        console.error("Erreur lors de l'ajout du Ville", error);
      },
    });
  }
}

