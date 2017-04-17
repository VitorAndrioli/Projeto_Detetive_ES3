import { Component, OnInit } from '@angular/core';
import {User } from '../models/user';
import {AuthService} from '../auth.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit  {

    public user = new User('','', false);
    public errorMsg = '';
 
    constructor( private auth:AuthService) {}

 ngOnInit(){
   this.auth.checkLoginCredentials();
 }
    login() {
        if(!this.auth.login(this.user)){
            this.errorMsg = 'email ou senha inválidos';
        }
    }
}
