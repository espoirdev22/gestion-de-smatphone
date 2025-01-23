// add-product.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProduitService } from '../service/produit.service'; 
import { Iproduit } from '../model/produit'; 

@Component({
  selector: 'app-add-produit',
  standalone:false,
  templateUrl: './add-produit.component.html'
})
export class AddProduitComponent {
  
    produitForm: FormGroup; // Notez que c'est productForm et non produForm
    imagePreview: string | null = null;
    selectedFile: File | null = null;
    isSubmitting = false;
  
    constructor(
      private fb: FormBuilder,
      private produitService: ProduitService,
      private router: Router
    ) {
      this.produitForm = this.fb.group({
        name: ['', [Validators.required]],
        marque: ['', [Validators.required]],
        description: ['', [Validators.required]],
        price: ['', [Validators.required, Validators.min(0)]],
        stock: ['', [Validators.required, Validators.min(0)]]
      });
    }

  onFileSelect(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  async onSubmit() {
    if (this.produitForm.valid && !this.isSubmitting && this.selectedFile) {
      this.isSubmitting = true;

      try {
        // Convertir l'image en base64
        const base64Image = await this.convertFileToBase64(this.selectedFile);
        
        // Créer l'objet produit
        const newProduit: Iproduit = {
          ...this.produitForm.value,
          imageUrl: base64Image // ou le chemin de l'image selon votre backend
        };

        // Envoyer au service
        this.produitService.addProduit(newProduit).subscribe({
          next: () => {
            this.router.navigate(['/produit']);
          },
          error: (error) => {
            console.error('Erreur lors de l\'ajout du produit:', error);
            this.isSubmitting = false;
          },
          complete: () => {
            this.isSubmitting = false;
          }
        });
      } catch (error) {
        console.error('Erreur lors du traitement de l\'image:', error);
        this.isSubmitting = false;
      }
    }
  }

  private convertFileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result as string;
        resolve(base64String);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  // Réinitialiser l'image
  resetImage() {
    this.imagePreview = null;
    this.selectedFile = null;
  }
}