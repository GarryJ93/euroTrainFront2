import { Component, ElementRef, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { StayCat } from 'src/app/models/stay-cat';




@Component({
  selector: 'app-category-filter',
  templateUrl: './category-filter.component.html',
  styleUrls: ['./category-filter.component.css'],
})
export class CategoryFilterComponent implements OnChanges {
  @Input() categoriesToDisplay!: StayCat[];
  @Output() categoriesTab = new EventEmitter<number[]>();
  allCategoriesId: number[] = [];
  checkedCatIds: number[] = [];
  

  constructor() { }
  ngOnChanges() {
    
    if (this.categoriesToDisplay) {
      this.allCategoriesId = this.categoriesToDisplay.map((cat) => cat.id);
      console.log(this.categoriesToDisplay);
    }

  }

 
  onCategoriesFilter(e: Event) {
    const target = e.target as HTMLInputElement;

    if (target.checked) {
      if (this.checkedCatIds.length === this.allCategoriesId.length) {
        this.checkedCatIds = [];
      }
      this.checkedCatIds.push(+target.value);
    } else {
      this.checkedCatIds = this.checkedCatIds.filter(
        (id: number) => id !== +target.value
      );
    }

    if (this.categoriesTab.length === 0) {
      this.checkedCatIds = [...this.allCategoriesId];
    }

    console.log('this.categoriesTabs', this.categoriesTab);
    this.categoriesTab.emit(this.checkedCatIds);
  }
}
