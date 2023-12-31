import { Component, EventEmitter, Input, Output } from '@angular/core';
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
  idsUser!: number[];
  userIdItinerary!: number[];
  @Input() allItineraries!: Itinerary[];
  constructor() {}

  ngOnInit() {
    if (this.usersToFilter) {
      this.allUsersId = this.usersToFilter.map((user) => user.id);
    }
  }

  onCheckUser(e: Event) {
    const target = e.target as HTMLInputElement;

    console.log(
      'Checkbox changed. Target value:',
      target.value,
      'Checked:',
      target.checked
    );

    if (target.checked) {
      this.allItineraries = [...this.allItineraries]
      
      if (target.value === 'deleted') {
        if (this.checkedUserId.length > 1) {
          this.idsUser = Array.from(
            new Set(this.usersToFilter.map((user) => user.id))
          );
          this.idsUser.push(+localStorage.getItem('id')!);
          console.log('id users', this.idsUser);
          this.userIdItinerary = Array.from(
            new Set(this.allItineraries.map((way) => way.id_user))
          );
          console.log('id user itineraire', this.userIdItinerary);
          const deletedId = this.userIdItinerary.filter(
            (id) => !this.idsUser.includes(id)
          );
          console.log('id deleted', deletedId);

          this.checkedUserId = Array.from(new Set([...this.checkedUserId, ...deletedId]));
          console.log(this.checkedUserId);
        } else {
        this.idsUser = Array.from(
          new Set(this.usersToFilter.map((user) => user.id))
        );
        this.idsUser.push(+localStorage.getItem('id')!);
        console.log('id users', this.idsUser);
        this.userIdItinerary = Array.from(
          new Set(this.allItineraries.map((way) => way.id_user))
        );
        console.log('id user itineraire', this.userIdItinerary);

        const deletedId = this.userIdItinerary.filter(
          (id) => !this.idsUser.includes(id)
        );
        console.log('id deleted', deletedId);

        this.checkedUserId = this.checkedUserId.concat(deletedId);
        console.log(this.checkedUserId);}
      } else {
      
        if (!this.checkedUserId.includes(+target.value)) {
          this.checkedUserId.push(+target.value);
        }
      }
    } else {
     
      if (target.value === 'deleted') {
        
        this.itinerariesList = [...this.allItineraries]
        this.idsUser = Array.from(
          new Set(this.usersToFilter.map((user) => user.id))
        );
        
        
        this.checkedUserId = this.idsUser.filter((id) => {
          const userCheckbox = document.getElementById(
            `${id}`
          ) as HTMLInputElement;

         
          return this.idsUser.includes(id) && userCheckbox.checked;
        });


      } else {
        
        this.checkedUserId = this.checkedUserId.filter(
          (id) => id !== +target.value
        );
      }
    }

    console.log('Updated checkedUserId:', this.checkedUserId);

   
    this.userIdsTab.emit(this.checkedUserId);
  }

  onEnterSearch(resultUserSearch: string) {
    console.log(resultUserSearch);

    this.userInput.emit(resultUserSearch);
  }
}
