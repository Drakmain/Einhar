import { Component, OnInit, Input, ElementRef} from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-emoji',
  templateUrl: './emoji.component.html',
  styleUrls: ['./emoji.component.css']
})

export class EmojiComponent implements OnInit {

  @Input() emoji: any;

  constructor(private api: ApiService, private el: ElementRef) { }

  async ngOnInit(): Promise<void> {
  }

}
