import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProduitService } from '../service/produit.service'; // Vérifiez que le nom est correct
import { Iproduit } from '../model/produit';

@Component({
  selector: 'app-detail-produit',
  templateUrl: './detail-produit.component.html',
  standalone: false,
  styleUrls: ['./detail-produit.component.css']
})
export class DetailProduitComponent implements OnInit {
  produit!: Iproduit | undefined;
  loading: boolean = true;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private produitService: ProduitService // Corrigé ici
  ) {}

  ngOnInit(): void {
    const productId = Number(this.route.snapshot.paramMap.get('id'));
    if (!isNaN(productId)) {
      this.produitService.getProduitById(productId).subscribe({
        next: (produit) => {
          this.produit = produit;
          this.loading = false;
        },
        error: (err) => {
          console.error('Erreur lors de la récupération du produit :', err);
          this.error = 'Produit non trouvé';
          this.loading = false;
        },
      });
    } else {
      this.error = 'ID de produit invalide';
      this.loading = false;
    }
  }
}
