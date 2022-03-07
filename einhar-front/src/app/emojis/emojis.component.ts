import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { ApiService } from '../api.service';

@Component({
  selector: 'app-emojis',
  templateUrl: './emojis.component.html',
  styleUrls: ['./emojis.component.css']
})
export class EmojisComponent implements OnInit {

  emojis!: any;
  selectedServer!: any;

  constructor(private api: ApiService, private router: Router) { }

  async ngOnInit(): Promise<void> {
    if (this.api.getIsLogged()) {
      this.selectedServer = this.api.getSelectedServer();
      this.emojis = await this.api.getEmojis(this.selectedServer.id);
    }
    else {
      this.router.navigate(['/']);
    }
  }
}
