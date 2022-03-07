import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-connections',
  templateUrl: './connections.component.html',
  styleUrls: ['./connections.component.css']
})
export class ConnectionsComponent implements OnInit {

  connections!: any;

  constructor(private api: ApiService) { }

  async ngOnInit(): Promise<void> {
    if (this.api.getIsLogged()) {
      this.connections = await this.api.getUserMeConnections();
    }
  }

}

