import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { ApiService } from '../api.service';

@Component({
  selector: 'app-salons',
  templateUrl: './salons.component.html',
  styleUrls: ['./salons.component.css']
})
export class SalonsComponent implements OnInit {

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
