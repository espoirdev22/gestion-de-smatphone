import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Iproduit } from '../model/produit';
import { map, switchMap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProduitService {
  private readonly PRODUIT_API_URL = 'http://localhost:3000/produit';

  constructor(private http: HttpClient) {}

  private getLastId(): Observable<number> {
    return this.getProduit().pipe(
      map((produits: Iproduit[]) => 
        produits.reduce((max, p) => Math.max(max, p.id), 0)
      ),
      catchError(error => {
        console.error('Erreur lors de la récupération du dernier ID:', error);
        return throwError(() => error);
      })
    );
  }

  public addProduit(produit: Iproduit): Observable<Iproduit> {
    return this.getLastId().pipe(
      map(lastId => ({ ...produit, id: lastId + 1 })),
      switchMap(newProduit => 
        this.http.post<Iproduit>(this.PRODUIT_API_URL, newProduit)
      ),
      catchError(error => {
        console.error('Erreur lors de l\'ajout du produit:', error);
        return throwError(() => error);
      })
    );
  }

  public getProduit(): Observable<Iproduit[]> {
    return this.http.get<Iproduit[]>(this.PRODUIT_API_URL).pipe(
      catchError(error => {
        console.error('Erreur lors de la récupération des produits:', error);
        return throwError(() => error);
      })
    );
  }

  public getProduitById(id: number): Observable<Iproduit> {
    return this.http.get<Iproduit>(`${this.PRODUIT_API_URL}/${id}`).pipe(
      catchError(error => {
        console.error(`Erreur lors de la récupération du produit ${id}:`, error);
        return throwError(() => error);
      })
    );
  }

  public deleteProduit(id: number): Observable<void> {
    return this.http.delete<void>(`${this.PRODUIT_API_URL}/${id}`).pipe(
      catchError(error => {
        console.error(`Erreur lors de la suppression du produit ${id}:`, error);
        return throwError(() => error);
      })
    );
  }

  public updateProduit(id: number, produit: Iproduit): Observable<Iproduit> {
    return this.http.put<Iproduit>(`${this.PRODUIT_API_URL}/${id}`, produit).pipe(
      catchError(error => {
        console.error(`Erreur lors de la mise à jour du produit ${id}:`, error);
        return throwError(() => error);
      })
    );
  }
}