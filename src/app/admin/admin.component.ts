import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProduitService } from '../service/produit.service';
import { Iproduit } from '../model/produit';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  standalone: false,
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  produits: Iproduit[] = [];
  produitFilter = '';
  showAddForm = false;
  showDetailModal = false;
  showEditModal = false;
  selectedProduit: Iproduit | null = null;
  loading = false;
  error = '';

  newProduit: Iproduit = this.getEmptyProduit();

  constructor(
    private produitService: ProduitService,
    private router: Router
  ) {
    this.selectedProduit = null;
  }

  private getEmptyProduit(): Iproduit {
    return {
      id: 0,
      name: '',
      marque: '',
      description: '',
      price: 0,
      imageUrl: ''
    };
  }

  ngOnInit(): void {
    this.loadProduits();
  }

  private loadProduits(): void {
    this.loading = true;
    this.error = '';
    this.produitService.getProduit().subscribe({
      next: (data: Iproduit[]) => {
        this.produits = data;
        this.loading = false;
      },
      error: (error) => {
        this.error = "Erreur lors du chargement des produits";
        this.loading = false;
        console.error(error);
      }
    });
  }

  get filteredProduit(): Iproduit[] {
    return this.produits.filter(produit =>
      produit.name.toLowerCase().includes(this.produitFilter.toLowerCase()) ||
      produit.marque.toLowerCase().includes(this.produitFilter.toLowerCase())
    );
  }

  editProduit(id: number): void {
    this.loading = true;
    this.error = '';
    this.produitService.getProduitById(id).subscribe({
      next: (produit: Iproduit) => {
        this.selectedProduit = produit;
        this.showEditModal = true;
        this.loading = false;
      },
      error: (error) => {
        this.error = "Erreur lors du chargement du produit";
        this.loading = false;
        console.error(error);
      }
    });
  }

  updateProduit(): void {
    if (this.selectedProduit) {
      if (this.validateProduit(this.selectedProduit)) {
        this.loading = true;
        this.error = '';
        this.produitService.updateProduit(this.selectedProduit.id, this.selectedProduit).subscribe({
          next: () => {
            this.loadProduits();
            this.closeEdit();
            this.loading = false;
          },
          error: (error) => {
            this.error = "Erreur lors de la mise à jour du produit";
            this.loading = false;
            console.error(error);
          }
        });
      }
    } else {
      this.error = "Aucun produit sélectionné";
    }
  }

  closeEdit(): void {
    this.showEditModal = false;
    this.selectedProduit = null;
  }

  showDetails(id: number): void {
    this.loading = true;
    this.error = '';
    this.produitService.getProduitById(id).subscribe({
      next: (produit: Iproduit) => {
        this.selectedProduit = produit;
        this.showDetailModal = true;
        this.loading = false;
      },
      error: (error) => {
        this.error = "Erreur lors du chargement du produit";
        this.loading = false;
        console.error(error);
      }
    });
  }

  closeDetails(): void {
    this.showDetailModal = false;
    this.selectedProduit = null;
  }

  get produitCount(): number {
    return this.filteredProduit.length;
  }

  toggleAddForm(): void {
    this.showAddForm = !this.showAddForm;
    if (!this.showAddForm) {
      this.resetNewProduit();
    }
  }

  resetNewProduit(): void {
    this.newProduit = this.getEmptyProduit();
  }

  onSubmit(): void {
    if (this.validateProduit()) {
      this.loading = true;
      this.error = '';
      this.produitService.addProduit(this.newProduit).subscribe({
        next: () => {
          this.loadProduits();
          this.toggleAddForm();
          this.resetNewProduit();
          this.loading = false;
        },
        error: (error) => {
          this.error = "Erreur lors de l'ajout du produit";
          this.loading = false;
          console.error(error);
        }
      });
    }
  }

  validateProduit(produit?: Iproduit): boolean {
    const p = produit || this.newProduit;
    if (!p.name.trim()) {
      this.error = "Le nom du produit est requis";
      return false;
    }
    if (!p.marque.trim()) {
      this.error = "La marque du produit est requise";
      return false;
    }
    if (!p.description.trim()) {
      this.error = "La description du produit est requise";
      return false;
    }
    if (p.price <= 0) {
      this.error = "Le prix doit être supérieur à 0";
      return false;
    }
    this.error = '';
    return true;
  }

  deleteProduit(id: number): void {
    this.loading = true;
    this.error = '';
    this.produitService.deleteProduit(id).subscribe({
      next: () => {
        this.loadProduits();
        this.loading = false;
      },
      error: (error) => {
        this.error = "Erreur lors de la suppression du produit";
        this.loading = false;
        console.error(error);
      }
    });
  }
}