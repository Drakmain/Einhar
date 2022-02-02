import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-serveur',
  templateUrl: './serveur.component.html',
  styleUrls: ['./serveur.component.css']
})
export class ServeurComponent implements OnInit {

  @Input() guild: any;
  @Input() isActiveBorder!: any;
  guildMember!: any;
  guildInfo !: any;
  isAdmin: boolean = false;

  constructor(private api: ApiService, private el: ElementRef) { }

  async ngOnInit(): Promise<void> {
    if (this.guild.permissions << 3 == -8) {
      this.isAdmin = true;
      //this.guildMember = await this.api.getUserGuildMember(this.guild.id);
    }
  }
}
