import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LandingPageComponent } from './landing-page/landing-page.component';
import { HeaderComponent } from './header/header.component';
import { ConnectionsComponent } from './connections/connections.component';
import { ServeursComponent } from './serveurs/serveurs.component';
import { RolesComponent } from './roles/roles.component';
import { SalonsComponent } from './salons/salons.component';
import { MembresComponent } from './membres/membres.component';
import { EmojisComponent } from './emojis/emojis.component';
import { AuthentificationComponent } from './authentification/authentification.component';

const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'authentification', component: AuthentificationComponent },
  { path: 'header', component: HeaderComponent },
  { path: 'connections', component: ConnectionsComponent },
  { path: 'serveurs', component: ServeursComponent },
  { path: 'roles', component: RolesComponent },
  { path: 'salons', component: SalonsComponent },
  { path: 'membres', component: MembresComponent },
  { path: 'emojis', component: EmojisComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
