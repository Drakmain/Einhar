import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})
export class RoleComponent implements OnInit {

  @Input() role: any;

  constructor() { }

  ngOnInit(): void {
  }

}
