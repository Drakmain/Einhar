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

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ServeursComponent,
    SalonsComponent,
    MembresComponent,
    EmojisComponent,
    LandingPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
