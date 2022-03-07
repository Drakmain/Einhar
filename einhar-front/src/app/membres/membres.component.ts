import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-membres',
  templateUrl: './membres.component.html',
  styleUrls: ['./membres.component.css']
})
export class MembresComponent implements OnInit {

  //Faire component user.
  members!: any;
  /*nick!: string;
  avatar!: string;
  joined_at!: Date;
  roles!: string[];*/

  constructor(private api: ApiService) { }

  async ngOnInit(): Promise<void> {
    this.members = await this.api.getGuildMembers(this.api.selectedServer);
    console.log(this.members);
  }

}
