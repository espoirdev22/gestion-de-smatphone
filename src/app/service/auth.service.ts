import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticated = false;

  constructor(private http: HttpClient) {}

  // Charger les utilisateurs depuis le fichier JSON
  getUsers(): Observable<any> {
    return this.http.get('/assets/users.json');
  }

  // Vérifier les informations de connexion
  login(username: string, password: string, users: any[]): boolean {
    const user = users.find(
      (u: any) => u.username === username && u.password === password
    );

    if (user) {
      this.isAuthenticated = true;
      localStorage.setItem('token', JSON.stringify(user)); // Stocker les infos utilisateur
      return true;
    }

    return false;
  }

  logout(): void {
    this.isAuthenticated = false;
    localStorage.removeItem('token');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
}
