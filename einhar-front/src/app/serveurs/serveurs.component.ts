import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-serveurs',
  templateUrl: './serveurs.component.html',
  styleUrls: ['./serveurs.component.css']
})
export class ServeursComponent implements OnInit {

  guilds!: any;
  guilds_length!: number;
  tabServerActiveBorder = new Map<any, boolean>();
  selectedServer!: string;


  constructor(private api: ApiService) { }

  async ngOnInit(): Promise<void> {
    if (this.api.getIsLogged()) {
      this.guilds = await this.api.getUserMeGuilds();
    }

    this.selectedServer = this.api.getSelectedServer();
    console.log(this.selectedServer);
    if (this.selectedServer === undefined) {
      for (let i = 0; i < Object.keys(this.guilds).length; i++) {
        this.tabServerActiveBorder.set(this.guilds[i].id, false);
      }
    }
    else {
      for (let i = 0; i < Object.keys(this.guilds).length; i++) {
        if (this.guilds[i].id === this.selectedServer) {
          this.tabServerActiveBorder.set(this.guilds[i].id, true);
        }
      }
    }
  }

  changeBorder(id: any) {
    for (let i = 0; i < Object.keys(this.guilds).length; i++) {
      this.tabServerActiveBorder.set(this.guilds[i].id, false);
    }

    for (let i = 0; i < Object.keys(this.guilds).length; i++) {
      if (this.guilds[i].id === id) {
        this.tabServerActiveBorder.set(this.guilds[i].id, true);
        this.selectedServer = this.guilds[i].id;
      }
    }
    this.api.setSelectedServer(this.selectedServer);
  }

}
