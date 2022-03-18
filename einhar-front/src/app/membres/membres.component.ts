import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { ApiService } from '../api.service';

@Component({
  selector: 'app-membres',
  templateUrl: './membres.component.html',
  styleUrls: ['./membres.component.css']
})
export class MembresComponent implements OnInit {

  selectedServer!: any;
  members!: any;

  constructor(private api: ApiService, private router: Router) { }

  async ngOnInit(): Promise<void> {

    if (this.api.getIsLogged()) {
      this.selectedServer = this.api.getSelectedServer();
      this.members = await this.api.getGuildMembers(this.selectedServer.id);
    }
    else {
      this.router.navigate(['/']);
    }
    
  }

}
