import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router:Router) {}

  canActivate() {
    return this.checkLogin() ;
  }
 
 checkLogin(): boolean {
    if (this.authService.isLoggedIn) { return true; }

    // Store the attempted URL for redirecting

    // Navigate to the login page with extras
    this.router.navigate(['/login']);
    return false;
  }
}