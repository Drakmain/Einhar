import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ServeursComponent } from './serveurs/serveurs.component';
import { SalonsComponent } from './salons/salons.component';
import { MembresComponent } from './membres/membres.component';
import { EmojisComponent } from './emojis/emojis.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { ServeurComponent } from './serveur/serveur.component';
import { EmojiComponent } from './emoji/emoji.component';
import { MembreComponent } from './membre/membre.component';
import { SalonComponent } from './salon/salon.component';
import { AuthentificationComponent } from './authentification/authentification.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ServeursComponent,
    SalonsComponent,
    MembresComponent,
    EmojisComponent,
    LandingPageComponent,
    ServeurComponent,
    EmojiComponent,
    MembreComponent,
    SalonComponent,
    AuthentificationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
