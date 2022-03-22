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
  selectedChannel: any = undefined;
  channels!: any;
  tabChannelActiveBorder = new Map<any, boolean>();
  messages!: any;
  selectedChannelTopic!: string;
  messagesLength!: number;

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
        this.messages = await this.api.getChannelMessages(this.selectedChannel.id);
      }
    }
    else {
      this.router.navigate(['/']);
    }

  }

  /**
   * Methode qui permet changer la bordure du salon selecionné
   * @param id l'id du salon selectionné
   */
  async changeBorder(id: string) {
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
    this.selectedChannelTopic = this.selectedChannel.topic;
    this.messagesLength = this.messages.length;
  }

  async updateMessages(){
    this.messages = await this.api.getChannelMessages(this.selectedChannel.id);
  }

}
