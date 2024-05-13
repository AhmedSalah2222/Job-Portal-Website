import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'hciproject';
  isLoggedIn: boolean = false;
  userInfo: any;
  constructor(private router : Router){}

  onClickLogin(){
    this.isLoggedIn = true;
    this.router.navigate(['/login']);
  }
  onClickRegister(){
    this.isLoggedIn = true;
    this.router.navigate(['/register']);
  }
  onClickLogout(){
    this.isLoggedIn = false;
    this.router.navigate(['/home']);
  }
}
