import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MessageService } from 'primeng/api';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.css'],
})
export class DeleteModalComponent {
  visible!: boolean;
  @Input() user!: User;
  @Output() newVisible = new EventEmitter<boolean>();
  
  constructor(
    private userService: UserService,
    private messageService: MessageService
  ) { }
  
  

  OnDeleteAllDataUser(user: User) {
    console.log(user);

    this.userService.deleteUserAndData(user.id).subscribe({
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

  OnSoftDeleteUser(user: User) {
    this.userService.softDeleteUser(user.id).subscribe({
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
