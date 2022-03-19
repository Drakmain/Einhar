import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-selected-server',
  templateUrl: './selected-server.component.html',
  styleUrls: ['./selected-server.component.css']
})
export class SelectedServerComponent implements OnInit {

  @Input() selectedServer: any;

  constructor() { }

  ngOnInit(): void {
  }

}
