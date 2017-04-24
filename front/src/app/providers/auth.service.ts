import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { WebsocketService} from './websocket.service';
import * as io from 'socket.io-client';

@Injectable()
export class AuthService {
  public isLoggedIn = false;
  public users = [
    new User('admin@admin.com', 'admin', true),
    new User('user@user.com', 'user', false)
  ];
  constructor(private websocket:WebsocketService,
    private _router: Router) { }

  logout() {
    sessionStorage.clear();
    sessionStorage.removeItem('userIsAdmin');
    sessionStorage.removeItem('userJoined');
    sessionStorage.removeItem('user');
    this._router.navigate(['login']);
  }

  login(user: User) {
    let authenticatedUser = this.users.find(u => u.email === user.email);
    if (authenticatedUser && authenticatedUser.password === user.password) {

      sessionStorage.setItem('user', authenticatedUser.email);
      if (authenticatedUser.admin) {
        sessionStorage.setItem('userIsAdmin', 'true');
        this._router.navigate(['admin']);
      } else {
        sessionStorage.setItem('userIsAdmin', 'false');
        this._router.navigate(['home']);
      }

    this.isLoggedIn = true;
      return true;

    }
    return false;

  }
  checkLoginCredentials() {
    if (sessionStorage.getItem('user')) {
      this._router.navigate(['home']);
    }
  }

  checkCredentials() {
    if (sessionStorage.getItem('user') === null) {
      this._router.navigate(['login']);
    }
  }
  checkAdmCredentials() {
    if (sessionStorage.getItem('userIsAdmin') === 'false') {
      this._router.navigate(['home']);
    }
  }
}
