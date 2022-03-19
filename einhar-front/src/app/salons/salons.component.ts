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
  selectedChannel!: any;
  channels!: any;
  tabChannelActiveBorder = new Map<any, boolean>();
  messages!: any;

  constructor(private api: ApiService, private router: Router) { }

  async ngOnInit(): Promise<void> {
    if (this.api.getIsLogged()) {
      this.selectedServer = this.api.getSelectedServer();
      this.selectedChannel = this.api.getSelectedChannel();
      this.channels = await this.api.getGuildChannels(this.selectedServer.id);

      if (this.selectedChannel === undefined) {
        for (let i = 0; i < Object.keys(this.channels).length; i++) {
          this.tabChannelActiveBorder.set(this.channels[i].id, false);
        }
      }
      else {
        for (let i = 0; i < Object.keys(this.channels).length; i++) {
          if (this.channels[i].id === this.selectedChannel.id) {
            this.tabChannelActiveBorder.set(this.channels[i].id, true);
          }
        }
      }
    }
    else {
      this.router.navigate(['/']);
    }

  }

  /**
   * Methode qui permet changer la bordure du membre selecionné
   * @param id l'id du membre selectionné
   */
  async changeBorder(id: any) {
    for (let i = 0; i < Object.keys(this.channels).length; i++) {
      this.tabChannelActiveBorder.set(this.channels[i].id, false);
    }

    for (let i = 0; i < Object.keys(this.channels).length; i++) {
      if (this.channels[i].id === id) {
        this.tabChannelActiveBorder.set(this.channels[i].id, true);
        this.selectedChannel = this.channels[i];
      }
    }
    this.api.setSelectedChannel(this.selectedChannel);
    this.messages = await this.api.getChannelMessages(this.selectedChannel.id);
  }

}
