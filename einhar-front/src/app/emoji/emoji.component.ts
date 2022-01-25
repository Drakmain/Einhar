import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-emoji',
  templateUrl: './emoji.component.html',
  styleUrls: ['./emoji.component.css']
})
export class EmojiComponent implements OnInit {

  id!: String;
  name!: String;
  user!: any;

  constructor() { }

  ngOnInit(): void {
  }

}
