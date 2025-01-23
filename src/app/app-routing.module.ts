import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component'; // Composant pour la page d'accueil
import { ProduitComponent } from './produit/produit.component'; // Composant pour le catalogue

import { DetailProduitComponent } from './detail-produit/detail-produit.component';
import { AdminComponent } from './admin/admin.component';
import { AddProduitComponent } from './add-produit/add-produit.component';
import { LoginComponent } from './login/login.component';



const routes: Routes = [
  { path: 'home', component: HomeComponent }, // Route pour la page d'accueil
  { path: 'produit', component: ProduitComponent }, // Route pour le catalogue
 {path:'login', component:LoginComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // Redirection vers la page d'accueil si la route est vide
  { path: 'detail-produit/:id', component: DetailProduitComponent },
  {path:'admin',component:AdminComponent},
  {path:'add-produit',component:AddProduitComponent},
  

 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], // Importation des routes dans le module
  exports: [RouterModule] // Exportation des routes pour pouvoir les utiliser dans d'autres modules
})
export class AppRoutingModule { }