import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { AuthService } from '../providers/auth.service';
import { WebsocketService } from '../providers/websocket.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private user: User;
  private socket: any;
  private users: Object[];

  constructor(private socketService: WebsocketService, private auth: AuthService) {
    this.socket = socketService.socket;
    this.users = [];
    this.user = new User(sessionStorage.getItem('user'), "", false);
  }



  ngOnInit() {
    if (this.auth.isLoggedIn && sessionStorage.getItem('userJoined') != 'true') {
      this.socket.emit('newUser', this.user.email);
      sessionStorage.setItem('userJoined', 'true');
    }
    this.auth.checkCredentials();
    this.socket.on('playersUpdate', (data) => {
      this.users = data;
      console.log(data);
    });

  }
  logout() {
    this.socket.disconnect();
    this.auth.logout();
  }

}
