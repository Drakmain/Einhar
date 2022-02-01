import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { ApiService } from '../api.service';

@Component({
  selector: 'app-authentification',
  templateUrl: './authentification.component.html',
  styleUrls: ['./authentification.component.css']
})
export class AuthentificationComponent implements OnInit {

  code!: any;
  error!: string;
  error_description!: string;

  constructor(private router: Router, private route: ActivatedRoute, private api: ApiService) { }

  async ngOnInit(): Promise<void> {
    this.route.queryParams.subscribe(params => {
      this.code = params['code'];
    });

    this.route.queryParams.subscribe(params => {
      this.error = params['error'];
    });

    this.route.queryParams.subscribe(params => {
      this.error_description = params['error_description'];
    });

    await this.api.authentification(this.code, this.error, this.error_description);

    if (this.api.error == undefined) {
      this.router.navigate(["/serveurs"])
    }
    else {
      this.router.navigate(["/"])
    }

  }

}
