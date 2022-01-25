import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-serveurs',
  templateUrl: './serveurs.component.html',
  styleUrls: ['./serveurs.component.css']
})
export class ServeursComponent implements OnInit {

  id!: String;
  type!: String;
  position!: number;
  name!: String;
  topic!: String;
  last_message_id!: String;
  user_limit!: number;
  message_count!: number;

  constructor() { }

  ngOnInit(): void {
  }

}
