import { Component, OnInit, Input, ElementRef} from '@angular/core';
import { ApiService } from '../api.service';


@Component({
  selector: 'app-membre',
  templateUrl: './membre.component.html',
  styleUrls: ['./membre.component.css']
})
export class MembreComponent implements OnInit {

  @Input() member: any;
  selectedServeur!: any;

  constructor(private api: ApiService) { }

  async ngOnInit(): Promise<void> {
    this.selectedServeur = await this.api.getSelectedServer();
  }

}
