import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  public user = new User('','', false);
  public passwordConfirm = '';
  public errorMsg ='';
  
    constructor( private auth:AuthService) {}

 ngOnInit(){
   this.auth.checkLoginCredentials();
 }

newUser(user:User){
  if(user.password == this.passwordConfirm){
  this.auth.users.push(user);
  this.auth.login(user);
}else{
  this.errorMsg = 'dados inválidos';
}
}
}