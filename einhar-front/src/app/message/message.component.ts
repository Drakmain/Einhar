import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  @Input() message: any;
  @Input() isFromSalons: boolean = false;
  @Output() updateMessages = new EventEmitter();

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.message.timestamp = new Date(this.message.timestamp).toLocaleString();
  }

  onDeleteMessage() {
    this.api.deleteUserMessage(this.message.channel_id, this.message.id);
    this.updateMessages.emit();
  }

  onPinMessage(){
    this.api.pinMessage(this.message.channel_id, this.message.id);
    this.updateMessages.emit();
  }

  onUnpinMessage(){
    this.api.unpinMessage(this.message.channel_id, this.message.id);
    this.updateMessages.emit();
  }

}
