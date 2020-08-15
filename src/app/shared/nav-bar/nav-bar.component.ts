import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  loggedName:string;
  constructor(private auth: AuthService,private router: Router) { 
  }

  ngOnInit() {
    this.loggedName = this.auth.loggedUser;
  }

  logOut(){

    localStorage.removeItem('jwt');
    this.router.navigate(['/login']);
  }
}
