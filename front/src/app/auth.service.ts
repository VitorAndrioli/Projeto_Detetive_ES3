import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './models/user';


@Injectable()
export class AuthService {
  public users = [
    new User('admin@admin.com', 'admin', true),
    new User('user@user.com', 'user', false)
  ];
  constructor(
    private _router: Router) { }

  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('userIsAdmin');
    this._router.navigate(['login']);
  }

  login(user: User) {
    let authenticatedUser = this.users.find(u => u.email === user.email);
    if (authenticatedUser && authenticatedUser.password === user.password) {

      localStorage.setItem('user', authenticatedUser.email);
      if (authenticatedUser.admin) {
        localStorage.setItem('userIsAdmin', 'true');
        this._router.navigate(['admin']);
      } else {
        localStorage.setItem('userIsAdmin', 'false');
        this._router.navigate(['home']);
      }
      return true;
    }
    return false;

  }
  checkLoginCredentials() {
    if (localStorage.getItem('user')) {
      this._router.navigate(['home']);
    }
  }

  checkCredentials() {
    if (localStorage.getItem('user') === null) {
      this._router.navigate(['login']);
    }
  }
  checkAdmCredentials() {
    if (localStorage.getItem('userIsAdmin') === 'false') {
      this._router.navigate(['home']);
    }
  }
}
