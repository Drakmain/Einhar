import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { ApiService } from '../api.service';

@Component({
  selector: 'app-membres',
  templateUrl: './membres.component.html',
  styleUrls: ['./membres.component.css']
})
export class MembresComponent implements OnInit {

  selectedServer!: any;
  selectedMember!: any;
  members!: any;
  tabMemberActiveBorder = new Map<any, boolean>();
  messages!: any;
  messagesLength!: number;

  constructor(private api: ApiService, private router: Router) { }

  async ngOnInit(): Promise<void> {

    if (this.api.getIsLogged()) {
      this.selectedServer = this.api.getSelectedServer();
      this.selectedMember = this.api.getSelectedMember();
      this.members = await this.api.getGuildMembers(this.selectedServer.id);

      if (this.selectedMember === undefined) {
        for (let i = 0; i < Object.keys(this.members).length; i++) {
          this.tabMemberActiveBorder.set(this.members[i].user.id, false);
        }
      }
      else {
        for (let i = 0; i < Object.keys(this.members).length; i++) {
          if (this.members[i].user.id === this.selectedMember.user.id) {
            this.tabMemberActiveBorder.set(this.members[i].user.id, true);
          }
        }
        this.messages = await this.api.getUserMessages(this.selectedServer.id, this.selectedMember.user.id);
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
  async changeBorder(id: string) {
    for (let i = 0; i < Object.keys(this.members).length; i++) {
      this.tabMemberActiveBorder.set(this.members[i].user.id, false);
    }

    for (let i = 0; i < Object.keys(this.members).length; i++) {
      if (this.members[i].user.id === id) {
        this.tabMemberActiveBorder.set(this.members[i].user.id, true);
        this.selectedMember = this.members[i];
      }
    }
    this.api.setSelectedMember(this.selectedMember);
    this.messages = await this.api.getUserMessages(this.selectedServer.id, this.selectedMember.user.id);
    this.messagesLength = this.messages.length;
  }

  async updateMessages() {
    this.messages = await this.api.getUserMessages(this.selectedServer.id, this.selectedMember.user.id);
  }
}
