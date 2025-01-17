import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component'; // Composant pour la page d'accueil
import { CatalogueComponent } from './catalogue/catalogue.component'; // Composant pour le catalogue
import { FormulaireComponent } from './formulaire/formulaire.component';
import { DetailCatalogueComponent } from './detail-catalogue/detail-catalogue.component';
import { AdminComponent } from './admin/admin.component';



const routes: Routes = [
  { path: 'home', component: HomeComponent }, // Route pour la page d'accueil
  { path: 'catalogue', component: CatalogueComponent }, // Route pour le catalogue
 {path:'formulaire', component:FormulaireComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // Redirection vers la page d'accueil si la route est vide
  { path: 'detail-catalogue/:id', component: DetailCatalogueComponent },
  {path:'admin',component:AdminComponent}

 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], // Importation des routes dans le module
  exports: [RouterModule] // Exportation des routes pour pouvoir les utiliser dans d'autres modules
})
export class AppRoutingModule { }