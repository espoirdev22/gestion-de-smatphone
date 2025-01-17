import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CatalogueService } from '../service/catalogue.service';
import { Icatalogue } from '../model/catalogue';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  standalone:false,
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  catalogue: Icatalogue[] = [];
  catalogueFilter: string = ''; // Pour filtrer le catalogue

  constructor(private catalogueService: CatalogueService, private router: Router) { }

  ngOnInit(): void {
    this.loadCatalogue();
  }

  private loadCatalogue(): void {
    this.catalogueService.getCatalogue().subscribe(
      (data: Icatalogue[]) => {
        this.catalogue = data;
      },
      (error) => {
        console.error("Erreur lors de la récupération du catalogue", error);
      }
    );
  }

  // Méthode pour filtrer le catalogue
  get filteredCatalogue(): Icatalogue[] {
    return this.catalogue.filter(catalogue =>
      catalogue.name.toLowerCase().includes(this.catalogueFilter.toLowerCase())
    );
  }

  // Méthode pour éditer un catalogue
  editCatalogue(id: number): void {
    this.router.navigate(['/edit-catalogue', id]);
  }

  // Méthode pour supprimer un catalogue
  deleteCatalogue(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce catalogue ?')) {
      this.catalogueService.deleteCatalogue(id).subscribe(() => {
        this.loadCatalogue(); // Recharger le catalogue après la suppression
      }, (error) => {
        console.error("Erreur lors de la suppression du catalogue", error);
      });
    }
  }

  // Compteur des catalogues filtrés
  get catalogueCount(): number {
    return this.filteredCatalogue.length;
  }
}