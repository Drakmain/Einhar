import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LandingPageComponent } from './landing-page/landing-page.component';
import { HeaderComponent } from './header/header.component';
import { ServeursComponent } from './serveurs/serveurs.component';
import { SalonsComponent } from './salons/salons.component';
import { MembresComponent } from './membres/membres.component';
import { EmojisComponent } from './emojis/emojis.component';

const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'header', component: HeaderComponent },
  { path: 'serveurs', component: ServeursComponent },
  { path: 'salons', component: SalonsComponent },
  { path: 'membres', component: MembresComponent },
  { path: 'emojis', component: EmojisComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
