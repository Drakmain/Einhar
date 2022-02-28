import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-emojis',
  templateUrl: './emojis.component.html',
  styleUrls: ['./emojis.component.css']
})
export class EmojisComponent implements OnInit {
   
  emojis!: any;

  constructor(private api: ApiService) { }

  async ngOnInit(): Promise<void> {
    this.emojis = await this.api.getEmojis(this.api.selectedServer);
    console.log(this.emojis);

  }

}


