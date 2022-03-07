import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { ApiService } from '../api.service';

@Component({
  selector: 'app-serveurs',
  templateUrl: './serveurs.component.html',
  styleUrls: ['./serveurs.component.css']
})
export class ServeursComponent implements OnInit {

  guilds!: any[];
  guilds_admin!: any[];
  guilds_length!: number;
  tabServerActiveBorder = new Map<any, boolean>();
  selectedServer!: any;

  constructor(private api: ApiService, private router: Router) { }

  async ngOnInit(): Promise<void> {

    if (this.api.getIsLogged()) {
      this.guilds = await this.api.getUserMeGuilds();

      this.guilds_admin = this.guilds.filter(g => g.permissions << 3 == -8);
      this.guilds = this.guilds.filter(g => g.permissions << 3 != -8);

      this.selectedServer = this.api.getSelectedServer();

      if (this.selectedServer === undefined) {
        for (let i = 0; i < Object.keys(this.guilds_admin).length; i++) {
          this.tabServerActiveBorder.set(this.guilds_admin[i].id, false);
        }
      }
      else {
        for (let i = 0; i < Object.keys(this.guilds_admin).length; i++) {
          if (this.guilds_admin[i].id === this.selectedServer.id) {
            this.tabServerActiveBorder.set(this.guilds_admin[i].id, true);
          }
        }
      }
    }
    else {
      this.router.navigate(['/']);
    }
  }

  changeBorder(id: any) {
    for (let i = 0; i < Object.keys(this.guilds_admin).length; i++) {
      this.tabServerActiveBorder.set(this.guilds_admin[i].id, false);
    }

    for (let i = 0; i < Object.keys(this.guilds_admin).length; i++) {
      if (this.guilds_admin[i].id === id) {
        this.tabServerActiveBorder.set(this.guilds_admin[i].id, true);
        this.selectedServer = this.guilds_admin[i];
      }
    }
    this.api.setSelectedServer(this.selectedServer);
  }

}
