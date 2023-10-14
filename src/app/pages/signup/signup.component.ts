import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
  
export class SignupComponent {
  addUser!: FormGroup;
  newUser!: User;
  

  constructor(private userService: UserService,
    private formBuilder: FormBuilder,
  private router: Router) { }
  
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
      alert('Veuillez saisir des mots de passe identiques')
    }
    else {
      this.onSubmit();
    }
  };
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
        alert('Utilisateur ajouté avec succès !');
        this.addUser.reset();
        this.router.navigate(['']);
      },
      error: (error) => {
        console.error("Erreur lors de l'ajout de l'utilisateur", error);
      },
    });
  }
}
