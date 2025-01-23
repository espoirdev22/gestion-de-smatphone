import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { IUser } from '../model/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly usersUrl = 'http://localhost:3000/auth';
  private currentUser: IUser | null = null;

  constructor(private http: HttpClient) {}

  // Récupérer tous les utilisateurs depuis le fichier JSON
  private getUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>(this.usersUrl).pipe(
      map(response => {
        console.log('Response from API:', response);
        // Si la réponse est un tableau, on le retourne directement
        if (Array.isArray(response)) {
          return response;
        }
        // Si la réponse est un objet avec une propriété auth qui est un tableau
        if (response && typeof response === 'object' && Array.isArray((response as any).auth)) {
          return (response as any).auth;
        }
        // Si on ne trouve pas de structure valide, on retourne un tableau vide
        console.error('Invalid response structure:', response);
        return [];
      }),
      catchError(error => {
        console.error('Error fetching users:', error);
        return of([]);
      })
    );
  }

  // Méthode pour valider les identifiants
  login(username: string, password: string): Observable<boolean> {
    return this.getUsers().pipe(
      map(users => {
        console.log('Users received:', users);
        
        if (!Array.isArray(users)) {
          console.error('Users is not an array:', users);
          return false;
        }

        const user = users.find(
          u => u.username === username && u.password === password
        );

        console.log('User found:', user);

        if (user) {
          this.currentUser = user;
          sessionStorage.setItem('username', user.username);
          return true;
        }

        return false;
      }),
      catchError(error => {
        console.error('Login error:', error);
        return of(false);
      })
    );
  }

  // Vérifie si un utilisateur est connecté
  isLoggedIn(): boolean {
    return sessionStorage.getItem('username') !== null;
  }

  // Déconnexion de l'utilisateur
  logout(): void {
    this.currentUser = null;
    sessionStorage.removeItem('username');
  }
}