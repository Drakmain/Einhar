import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-serveur',
  templateUrl: './serveur.component.html',
  styleUrls: ['./serveur.component.css']
})
export class ServeurComponent implements OnInit {

  @Input() guild: any;

  constructor() { }

  async ngOnInit(): Promise<void> {
  }
}
