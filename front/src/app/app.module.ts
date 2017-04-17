import { BrowserModule } from '@angular/platform-browser';
import {RouterModule, Routes} from '@angular/router';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {MaterialModule}  from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { LoginComponent} from  './login/login.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import 'hammerjs';
import { AdminComponent } from './admin/admin.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import {AuthService} from'./auth.service';
import { HomeComponent } from './home/home.component'
const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'admin', component: AdminComponent },
   { path: 'sign-up', component: SignUpComponent },
   {path: 'home', component: HomeComponent},
  { path: '**',
    redirectTo: '/login',
    pathMatch: 'full'
  }
];
@NgModule({
  declarations: [
    LoginComponent,
    AppComponent,
    AdminComponent,
    SignUpComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule.forRoot(),
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule,
    FlexLayoutModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
