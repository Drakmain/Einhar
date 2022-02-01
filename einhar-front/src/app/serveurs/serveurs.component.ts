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

  constructor(private api: ApiService) { }

  async ngOnInit(): Promise<void> {
    if (this.api.getIsLogged()) {
      this.guilds = await this.api.getUserMeGuilds();
    }

  }

}
