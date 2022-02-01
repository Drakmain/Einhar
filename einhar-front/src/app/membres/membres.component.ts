import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-membres',
  templateUrl: './membres.component.html',
  styleUrls: ['./membres.component.css']
})
export class MembresComponent implements OnInit {

  //Faire component user.
  nick!: string;
  avatar!: string;
  joined_at!: Date;
  roles!: string[];

  constructor() { }

  ngOnInit(): void {
  }

}
