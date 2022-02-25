import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-serveur-admin',
  templateUrl: './serveur-admin.component.html',
  styleUrls: ['./serveur-admin.component.css']
})
export class ServeurAdminComponent implements OnInit {

  @Input() guild: any;
  @Input() isActiveBorder!: any;
  guildMember!: any;
  guildInfo!: any;
  isAdmin: boolean = false;
  isBot: boolean = false;

  constructor(private api: ApiService) { }

  async ngOnInit(): Promise<void> {
    if (this.guild.permissions << 3 == -8) {
      this.isAdmin = true;
      //this.guildMember = await this.api.getUserGuildMember(this.guild.id);
      this.guildInfo = await this.api.getGuild(this.guild.id);

      if (this.guildInfo != 401) {
        this.isBot = true;
      }
    }
  }

}
