import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  isLogged: boolean = false;
  error!: string;
  error_description!: string;

  constructor(private api: ApiService) { }

  ngOnInit(): void {

    this.isLogged = this.api.getIsLogged();
    this.error = this.api.getError();
    this.error_description = this.api.getError_description();

  }

}
