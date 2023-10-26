import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Itinerary } from 'src/app/models/itinerary';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-admin-itineraries-list',
  templateUrl: './admin-itineraries-list.component.html',
  styleUrls: ['./admin-itineraries-list.component.css'],
})
export class AdminItinerariesListComponent {
  @Input() itinerariesList!: Itinerary[];
  @Input() usersToFilter!: User[];
  @Input() full_access!: Boolean;
  allUsersId: number[] = [];
  checkedUserId: number[] = [];
  @Output() userIdsTab = new EventEmitter<number[]>();
  @Output() userInput = new EventEmitter<string>();
  sidebarVisible: boolean = false;
  constructor() {}

  ngOnInit() {
    if (this.usersToFilter) {
      this.allUsersId = this.usersToFilter.map((user) => user.id);
    }
  }

  onCheckUser(e: Event) {
    const target = e.target as HTMLInputElement;

    if (target.checked) {
      if (this.checkedUserId.length === this.usersToFilter.length) {
        this.checkedUserId = [];
      }
      this.checkedUserId.push(+target.value);
    } else {
      this.checkedUserId = this.checkedUserId.filter(
        (id) => id !== +target.value
      );
    }

    if (this.checkedUserId.length === 0) {
      this.checkedUserId = [...this.allUsersId];
    }

    console.log('this.checkedUserIds', this.checkedUserId);
    // le .emit() de notre Output devra se faire à la fin de cette méthode
    this.userIdsTab.emit(this.checkedUserId);
  }

  onEnterSearch(resultUserSearch: string) {
    console.log(resultUserSearch);

    this.userInput.emit(resultUserSearch);
  }
}
