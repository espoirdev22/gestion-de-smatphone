import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CatalogueService } from '../service/catalogue.service'; // Vérifiez que le nom est correct
import { Icatalogue } from '../model/catalogue';

@Component({
  selector: 'app-detail-catalogue',
  templateUrl: './detail-catalogue.component.html',
  standalone:false,
  styleUrls: ['./detail-catalogue.component.css']
})
export class DetailCatalogueComponent implements OnInit {
  catalogue!: Icatalogue | undefined;
  loading: boolean = true;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private catalogueService: CatalogueService // Corrigé ici
  ) {}

  ngOnInit(): void {
    const productId = Number(this.route.snapshot.paramMap.get('id'));
    if (!isNaN(productId)) {
      this.catalogueService.getCatalogueById(productId).subscribe({
        next: (catalogue) => {
          this.catalogue = catalogue;
          this.loading = false;
        },
        error: (err) => {
          console.error('Erreur lors de la récupération du catalogue :', err);
          this.error = 'Catalogue non trouvé';
          this.loading = false;
        },
      });
    } else {
      this.error = 'ID de produit invalide';
      this.loading = false;
    }
  }
}