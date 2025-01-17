import { Component, OnInit } from '@angular/core';
import { CatalogueService } from '../service/catalogue.service';
import { Icatalogue } from '../model/catalogue';


@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  standalone:false,
  styleUrls: ['./catalogue.component.css']
})
export class CatalogueComponent implements OnInit {
  catalogue: Icatalogue[] = [];
  catalogueFilter: string = ''; // For filtering the catalogue
  
  constructor(private catalogueService: CatalogueService) { }

  ngOnInit(): void {
    this.loadCatalogue();
  }

  private loadCatalogue(): void {
    this.catalogueService.getCatalogue().subscribe(
      (data: Icatalogue[]) => {
        this.catalogue = data;
      },
      (error) => {
        console.error("Error fetching catalogue", error);
      }
    );
  }

  // Method to filter the catalogue based on the search input
  get filteredCatalogue(): Icatalogue[] {
    return this.catalogue.filter(catalogue =>
      catalogue.name.toLowerCase().includes(this.catalogueFilter.toLowerCase())
    );
  }
  get catalogueCount(): number {
    return this.filteredCatalogue.length; // Compteur des téléphones filtrés
  }
}