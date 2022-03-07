import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { ApiService } from '../api.service';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {

  roles!: any;
  selectedServer!: any;

  constructor(private api: ApiService, private router: Router) { }

  async ngOnInit(): Promise<void> {

    if (this.api.getIsLogged()) {
      this.selectedServer = this.api.getSelectedServer();
      
      this.roles = await this.api.getGuildRoles(this.selectedServer.id);

      this.roles.sort(function (a: any, b: any) {
        a = a.position;
        b = b.position;

        if (a < b) {
          return 1;
        } else if (a > b) {
          return -1;
        }
        else {
          return 0;
        }

      });
    }
    else {
      this.router.navigate(['/']);
    }

  }



}
