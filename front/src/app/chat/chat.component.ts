import { Component, OnInit } from '@angular/core';
import { WebsocketService } from '../providers/websocket.service';
import { Message} from '../models/message';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  private chat: Message[]
  private socket:any;
  private messageText ="";
  constructor(private socketService: WebsocketService) { 
    this.chat = []
    this.socket = socketService.socket;
  }

  ngOnInit() {
      this.socket.on('chatUpdate', (msg:Message) => {
      console.log(msg);
      this.chat.push(msg);
    });
  }
  
  sendMsg() {

let msg = new Message();
msg.system= false;
msg.text = this.messageText;
msg.user = sessionStorage.getItem('user');
this.socket.emit('newMessage', msg);

  }

}
