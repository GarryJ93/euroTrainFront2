import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import * as emailjs from 'emailjs-com';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  addUser!: FormGroup;
  newUser!: User;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private router: Router,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.addUser = this.formBuilder.group({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
      password2: new FormControl('', Validators.required),
      motivation: new FormControl(''),
    });
  }

  onCheckPassword() {
    if (this.addUser.value.password !== this.addUser.value.password2) {
      alert('Veuillez saisir des mots de passe identiques');
    } else {
      this.onSubmit();
    }
  }
  onSubmit() {
    let newUser: User = {
      ...this.addUser.value,
      // access: false,
      // full_access: false
    };

    console.log(newUser);
    if (!this.addUser.valid) {
      newUser = {
        ...this.addUser.value,
        // access: false,
        // full_access: false
      };
    }
    this.userService.addUser(newUser).subscribe({
      next: () => {
        this.showMessageSignIn();
        if (newUser) {
          const templateParams = {
            to_email: newUser.email,
            user_name: newUser.name,
            from_name: 'EuroTrain',
            message:
              'Votre demande pour rejoindre nos contributeurs est bien prise en compte, vous recevrez un E-mail une fois votre demande acceptée.',
          };

          emailjs
            .send(
              'service_73hokvk',
              'template_uxjaxkd',
              templateParams,
              '4cxfky9LnJQXAKYwU'
            )
            .then((response) => {
              console.log('Email sent successfully:', response);
            })
            .catch((error) => {
              console.error('Error sending email:', error);
            });
        }
        setTimeout(() => {
          this.addUser.reset();
          this.router.navigate(['']);
        }, 3000);
        
      },
      error: (error) => {
        console.error("Erreur lors de l'ajout de l'utilisateur", error);
        this.showMessageError();
      },
    });
  }

  showMessageSignIn() {
    this.messageService.add({
      severity: 'success',
      summary: 'Félicitations',
      detail: 'Votre profil est en attente de validation !',
    });
  }

  showMessageError() {
    this.messageService.add({
      severity: 'error',
      summary: 'Erreur',
      detail: "Impossible d'ajouter l'utilisateur !",
    });
  }

 
}
