import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  user!: any;
  isLogged: boolean = false;
  avatar_icon!: string;
  username!: string;

  constructor(private api: ApiService) { }

  async ngOnInit(): Promise<void> {

    this.isLogged = this.api.getIsLogged();

    if (this.isLogged == true) {
      this.user = await this.api.getUserMe();
      this.username = this.user.username;

      this.avatar_icon = `<img src="https://cdn.discordapp.com/avatars/` + this.user.id + `/` + this.user.avatar + `.webp" width="30" class="rounded" height="30" alt="">`
    }

  }

}
