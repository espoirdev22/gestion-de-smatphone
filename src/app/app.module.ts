import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';


import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ProduitComponent } from './produit/produit.component';
import { ProduitService } from './service/produit.service';
import { SmartphoneComponent } from './smartphone/smartphone.component';

import { DetailProduitComponent } from './detail-produit/detail-produit.component';
import { AdminComponent } from './admin/admin.component';
import { AddProduitComponent } from './add-produit/add-produit.component';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';




@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProduitComponent, // Remplacement de CatalogueComponent par ProduitComponent
    SmartphoneComponent,
  
    DetailProduitComponent, // Remplacement de DetailCatalogueComponent par DetailProduitComponent
    AdminComponent, AddProduitComponent, LoginComponent,
   

  ],
  imports: [
   
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    FormsModule,CommonModule,
    HttpClientModule
  ],
  providers: [ProduitService], // Remplacement de CatalogueService par ProduitService
  bootstrap: [AppComponent]
})
export class AppModule { }
