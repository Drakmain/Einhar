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

  constructor(private api: ApiService, private router: Router) { }

  ngOnInit(): void {
    if (this.api.getIsLogged()) {
      this.selectedServer = this.api.getSelectedServer();
    }
    else {
      this.router.navigate(['/']);
    }

  }

}
