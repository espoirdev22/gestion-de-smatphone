import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Icatalogue } from '../model/catalogue'; // Ajustez le chemin si nécessaire

@Injectable({
  providedIn: 'root'
})
export class CatalogueService {
  private readonly CATALOGUE_API_URL = 'http://localhost:3000/catalogue'; // Assurez-vous que ce chemin est correct

  constructor(private http: HttpClient) {}

  // Méthode pour récupérer l'ensemble du catalogue
  public getCatalogue(): Observable<Icatalogue[]> {
    return this.http.get<Icatalogue[]>(this.CATALOGUE_API_URL);
  }

  public getCatalogueById(id: number): Observable<Icatalogue> {
    return this.http.get<Icatalogue>(`${this.CATALOGUE_API_URL}/${id}`);
  }

  // Méthode pour supprimer un catalogue par ID
  public deleteCatalogue(id: number): Observable<void> {
    return this.http.delete<void>(`${this.CATALOGUE_API_URL}/${id}`);
  }

  // Méthode pour mettre à jour un catalogue
  public updateCatalogue(id: number, catalogue: Icatalogue): Observable<Icatalogue> {
    return this.http.put<Icatalogue>(`${this.CATALOGUE_API_URL}/${id}`, catalogue);
  }

  // Méthode pour ajouter un catalogue
  public addCatalogue(catalogue: Icatalogue): Observable<Icatalogue> {
    return this.http.post<Icatalogue>(this.CATALOGUE_API_URL, catalogue);
  }
 }