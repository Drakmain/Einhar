import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../api.service';


@Component({
  selector: 'app-membre',
  templateUrl: './membre.component.html',
  styleUrls: ['./membre.component.css']
})
export class MembreComponent implements OnInit {

  @Input() member: any;
  @Input() isActiveBorder!: any;

  constructor(private api: ApiService) { }

  async ngOnInit(): Promise<void> {
    this.member.joined_at = new Date(this.member.joined_at);
    this.member.joined_at = this.member.joined_at.getUTCDay() + "/" + this.member.joined_at.getUTCMonth() + "/" + this.member.joined_at.getUTCFullYear();
  }

}
