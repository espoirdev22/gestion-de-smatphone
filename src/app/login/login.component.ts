import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone:false,
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup; // Formulaire de connexion
  errorMessage: string | null = null; // Message d'erreur en cas de problème

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    // Initialisation du formulaire avec validations
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]], // Nom d'utilisateur requis
      password: ['', [Validators.required]], // Mot de passe requis
    });
  }

  /**
   * Gestion de la soumission du formulaire
   */
  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.errorMessage = 'Veuillez remplir tous les champs obligatoires.';
      return;
    }

    // Récupérer les valeurs du formulaire
    const { username, password } = this.loginForm.value;

    this.authService.login(username, password).subscribe({
      next: (isAuthenticated) => {
        if (isAuthenticated) {
          console.log('Authentification réussie, redirection vers /admin');
          this.router.navigate(['/admin']).then(
            (navigated) => {
              console.log('Navigation réussie:', navigated);
            },
            (error) => {
              console.error('Erreur de navigation:', error);
            }
          );
        } else {
          this.errorMessage = "Nom d'utilisateur ou mot de passe incorrect.";
        }
      },
      error: (error) => {
        console.error('Erreur d\'authentification:', error);
        this.errorMessage = 'Une erreur est survenue. Veuillez réessayer.';
      },
    });
  }

  /**
   * Vérifie si un champ de formulaire est invalide et touché
   * @param field Le nom du champ de formulaire
   * @returns True si le champ est invalide et touché
   */
  isFieldInvalid(field: string): boolean {
    const control = this.loginForm.get(field);
    return !!(control && control.invalid && control.touched);
  }
}
