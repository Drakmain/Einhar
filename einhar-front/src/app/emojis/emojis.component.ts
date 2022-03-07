import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { ApiService } from '../api.service';

@Component({
  selector: 'app-emojis',
  templateUrl: './emojis.component.html',
  styleUrls: ['./emojis.component.css']
})
export class EmojisComponent implements OnInit {

  constructor(private api: ApiService, private router: Router) { }

  selectedServer!: any;

  ngOnInit(): void {
    if (this.api.getIsLogged()) {
      this.selectedServer = this.api.getSelectedServer();
    }
    else {
      this.router.navigate(['/']);
    }

  }

}
