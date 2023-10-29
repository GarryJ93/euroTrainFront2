import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';

import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-btn-confirm-suppression',
  templateUrl: './btn-confirm-suppression.component.html',
  styleUrls: ['./btn-confirm-suppression.component.css'],
})
export class BtnConfirmSuppressionComponent {
  visible: boolean = false;
  currentId!: number;

  constructor(private userService: UserService,
  private messageService: MessageService) { }

  ngOnInit() {
    this.currentId = +localStorage.getItem('id')!;
  }
  OnDeleteAllDataUser(idUser: number) {
    this.userService.deleteUserAndData(idUser).subscribe({
      next: (response) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Supprimé',
          detail: 'Votre profil est supprimé.',
        });
        this.closeDialogConfirm();
        localStorage.clear();
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
        this.messageService.add({
          severity: 'warn',
          summary: 'Supprimé',
          detail: 'Profil supprimé et itinéraires conservés.',
        });
        this.closeDialogConfirm();
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
