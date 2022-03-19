import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-connection',
  templateUrl: './connection.component.html',
  styleUrls: ['./connection.component.css']
})
export class ConnectionComponent implements OnInit {

  @Input() connection: any;
  logoConnectionDisplay!: String;
  urlLogoBattlenet: String = "https://pic.clubic.com/v1/images/1912347/raw.webp?fit=smartCrop&width=180&height=180&hash=65b8852d7332e1a48358dba2584ee10db3581695";
  urlLogoFacebook: String = "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/2021_Facebook_icon.svg/640px-2021_Facebook_icon.svg.png";
  urlLogoGitHub: String = "einhar-front/src/assets/GitHub-Mark-Light-32px.png";
  urlLogoPlayStation: String = "https://logo-marque.com/wp-content/uploads/2020/11/PlayStation-Embleme.png";
  urlLogoReddit: String = "https://www.elementaryos-fr.org/wp-content/uploads/2019/08/logo-reddit.png";
  urlLogoSpotify: String = "https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Spotify_logo_without_text.svg/2048px-Spotify_logo_without_text.svg.png";
  urlLogoSteam: String = "https://e7.pngegg.com/pngimages/699/999/png-clipart-brand-logo-steam-gump-s.png";
  urlLogoTwitch: String = "https://www.pngplay.com/wp-content/uploads/12/Twitch-Logo-Transparent-Image.png";
  urlLogoTwitter: String = "https://upload.wikimedia.org/wikipedia/fr/thumb/c/c8/Twitter_Bird.svg/1200px-Twitter_Bird.svg.png";
  urlLogoXbox: String = "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Xbox_one_logo.svg/2048px-Xbox_one_logo.svg.png";
  urlLogoYoutube: String = "https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/YouTube_full-color_icon_%282017%29.svg/1024px-YouTube_full-color_icon_%282017%29.svg.png";
  urlLogoVerified: String = "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Check_green_circle.svg/1200px-Check_green_circle.svg.png"
  urlLogoNotVerified: String = "https://sgen-cfdt.fr/contenu/uploads/sites/11/2019/11/faux-e1573554265521.png"
  logoVerifiedDisplay!: String;
  constructor(private api: ApiService) { }

  ngOnInit(): void {

    if (this.connection == "battle.net") {
      this.logoConnectionDisplay = this.urlLogoBattlenet;
    }
    if (this.connection.type == "facebook") {
      this.logoConnectionDisplay = this.urlLogoFacebook;
    }
    if (this.connection.type == "github") {
      this.logoConnectionDisplay = this.urlLogoGitHub;
    }
    if (this.connection.type == "playstation network") {
      this.logoConnectionDisplay = this.urlLogoPlayStation;
    }
    if (this.connection.type == "reddit") {
      this.logoConnectionDisplay = this.urlLogoReddit;
    }
    if (this.connection.type == "spotify") {
      this.logoConnectionDisplay = this.urlLogoSpotify;
    }
    if (this.connection.type == "steam") {
      this.logoConnectionDisplay = this.urlLogoSteam;
    }
    if (this.connection.type == "twitch") {
      this.logoConnectionDisplay = this.urlLogoTwitch;
    }
    if (this.connection.type == "twitter") {
      this.logoConnectionDisplay = this.urlLogoTwitter;
    }
    if (this.connection.type == "xbox") {
      this.logoConnectionDisplay = this.urlLogoXbox;
    }
    if (this.connection.type == "youtube") {
      this.logoConnectionDisplay = this.urlLogoYoutube;
    }

    if (this.connection.verified) {
      this.logoVerifiedDisplay = this.urlLogoVerified;
    }
    else {
      this.logoVerifiedDisplay = this.urlLogoNotVerified;
    }
  }

}

