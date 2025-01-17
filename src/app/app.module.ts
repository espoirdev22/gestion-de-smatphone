import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CatalogueComponent } from './catalogue/catalogue.component';
import { CatalogueService } from './service/catalogue.service';
import { SmartphoneComponent } from './smartphone/smartphone.component';
import { FormulaireComponent } from './formulaire/formulaire.component';
import { DetailCatalogueComponent } from './detail-catalogue/detail-catalogue.component';
import { AdminComponent } from './admin/admin.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CatalogueComponent,
    SmartphoneComponent,
    FormulaireComponent,
    DetailCatalogueComponent,
    AdminComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [CatalogueService], // Ajouté pour clarté
  bootstrap: [AppComponent] // Assurez-vous que cela est inclus
})
export class AppModule { }