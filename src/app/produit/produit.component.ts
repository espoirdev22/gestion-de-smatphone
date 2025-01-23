import { Component, OnInit } from '@angular/core';
import { ProduitService } from '../service/produit.service';
import { Iproduit } from '../model/produit';

@Component({
  selector: 'app-produit',
  templateUrl: './produit.component.html',
  standalone: false,
  styleUrls: ['./produit.component.css'],
})
export class ProduitComponent implements OnInit {
  produit: Iproduit[] = []; // Liste des produits
  produitFilter: string = ''; // Pour le filtre de recherche

  constructor(private produitService: ProduitService) {}

  ngOnInit(): void {
    this.loadProduit(); // Charger les produits au démarrage
  }

  // Méthode pour charger la liste des produits depuis le service
  private loadProduit(): void {
    this.produitService.getProduit().subscribe(
      (data: Iproduit[]) => {
        this.produit = data; // Assignation des données récupérées
      },
      (error) => {
        console.error('Erreur lors de la récupération des produits', error);
      }
    );
  }

  // Méthode pour filtrer les produits selon le champ de recherche
  get filteredProduit(): Iproduit[] {
    return this.produit.filter((produit) =>
      produit.name.toLowerCase().includes(this.produitFilter.toLowerCase())
    );
  }

  // Compteur des produits affichés après le filtrage
  get produitCount(): number {
    return this.filteredProduit.length;
  }
}
