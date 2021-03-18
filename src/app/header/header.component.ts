import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UserEntity } from '../services/interfaces/auth.interfaces';
import { OrganizationService } from '../services/organization.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  user!: UserEntity;

  
  constructor(
    private router: Router,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    if (!this.authService.isAuthenticated()){
      this.router.navigate((['auth']));
    }
    this.initUser();
  }

  initUser() {
    this.authService.getUser().subscribe(
      res => {
        this.user = res
      console.log(this.user)
    }, 
      err => {
        console.log(err); 
        alert("user is not available");
        this.router.navigate((['auth']));
      });
  }
}
