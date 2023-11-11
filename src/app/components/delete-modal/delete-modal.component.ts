import { Component, EventEmitter, Input, Output } from '@angular/core';
import { response } from 'express';
import { MessageService } from 'primeng/api';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.css'],
})
export class DeleteModalComponent {
  @Input() visible!: boolean;
  @Input() idUser!: number;
  @Output() newVisible = new EventEmitter<boolean>();
  user!: User;
  constructor(
    private userService: UserService,
    private messageService: MessageService
  ) { }
  
  

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
        this.closeDialog();
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

  OnSoftDeleteUser(idUser: number) {
    this.userService.softDeleteUser(idUser).subscribe({
      next: (response) => {
        this.userService.getAllUsers().subscribe({
          next: (response) => {
            this.userService.adminUsers$.next(response);
            this.userService.candidateUsers$.next(response);
            this.userService.allUsers$.next(response);
          }
        });
        this.closeDialog();
        this.messageService.add({
          severity: 'warn',
          summary: 'Supprimé',
          detail: 'Utilisateur supprimé et itinéraires conservés.',
        });
      },
      error: (error) => {
        console.error('Erreur lors de la suppression', error);
      },
    });
  }

  closeDialog() {
    this.visible = false;
    this.newVisible.emit(this.visible);
  }
}
