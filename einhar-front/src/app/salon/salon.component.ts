import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-salon',
  templateUrl: './salon.component.html',
  styleUrls: ['./salon.component.css']
})
export class SalonComponent implements OnInit {

  @Input() channel: any;
  @Input() isActiveBorder!: any
  logoChannelDisplay!: String;
  isDisplayed: boolean = true;

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.channel.joined_at = new Date(this.channel.joined_at);
    this.channel.joined_at = this.channel.joined_at.getUTCDay() + "/" + this.channel.joined_at.getUTCMonth() + "/" + this.channel.joined_at.getUTCFullYear();

    switch (this.channel.type) {
      case 0: this.logoChannelDisplay = "text";
        break;
      case 2: this.logoChannelDisplay = "vocal";
        break;
      //case 5: this.logoChannelDisplay = "news";
      //break;
      case 13: this.logoChannelDisplay = "conference";
        break;
      default: this.isDisplayed = false;
    }
  }

}
