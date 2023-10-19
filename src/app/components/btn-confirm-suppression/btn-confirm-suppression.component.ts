import { Component } from '@angular/core';

import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-btn-confirm-suppression',
  templateUrl: './btn-confirm-suppression.component.html',
  styleUrls: ['./btn-confirm-suppression.component.css'],
})
export class BtnConfirmSuppressionComponent {
  visible: boolean = false;
  currentId!: number;

  constructor(
    private userService: UserService) { }
  
  ngOnInit() {
    this.currentId = +localStorage.getItem('id')!;
  }
  OnDeleteAllDataUser(idUser: number) {
    this.userService.deleteUserAndData(idUser).subscribe({
      next: (response) => {
        alert('Opération réussie');
        localStorage.clear();
        location.reload();
      },
      error: (error) => {
        console.error('Erreur lors de la suppression', error);
      },
    });
  }
  showDialogConfirm() {
    this.visible = true;
  }

  closeDialogConfirm() {
    this.visible = false;
  }
}
