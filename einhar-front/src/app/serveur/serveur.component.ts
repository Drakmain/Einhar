import { Component, OnInit } from '@angular/core';
import * as internal from 'stream';

@Component({
  selector: 'app-serveur',
  templateUrl: './serveur.component.html',
  styleUrls: ['./serveur.component.css']
})
export class ServeurComponent implements OnInit {

  id!: String;
  name!: String;
  icon!: String;
  memberCount!: number;
  maximumMembers!: number;
  ownerId!: String;
  createdTimestamp!: Date; //console.log(createdTimestamp.toString());

  constructor() { }

  ngOnInit(): void {
  }

}
